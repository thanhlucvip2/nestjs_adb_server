import { Injectable, Logger } from '@nestjs/common';
import Adb from '@devicefarmer/adbkit';
import * as fs from 'fs';
import * as path from 'path';
import { KEY } from '@utils/key';
@Injectable()
export class AdbService {
  private readonly client = Adb.createClient();

  async sleep(second: number) {
    const setTime = new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, second + 100);
    });
    return await setTime;
  }

  async getDevice(deviceId: string) {
    return await this.client.getDevice(deviceId);
  }

  async listDevices() {
    try {
      const listDevices = await this.client.listDevices();
      return listDevices;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async click(payload: { deviceId: string; x: number; y: number }) {
    try {
      const device = this.client.getDevice(payload.deviceId);
      await device.shell(`input tap ${payload.x} ${payload.y}`);
      return true;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async input(payload: { deviceId: string; text: string; duration: number }) {
    try {
      const device = this.client.getDevice(payload.deviceId);
      const listText = payload.text.split('');
      for (let index = 0; index < listText.length; index++) {
        await this.sleep(payload.duration);
        await device.shell(`input text ${listText[index]}`);
      }
      return true;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async swipe(payload: {
    deviceId: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    duration: number;
  }) {
    const { deviceId, duration, x1, x2, y1, y2 } = payload;
    try {
      const device = this.client.getDevice(deviceId);
      await device.shell(`input swipe ${x1} ${y1} ${x2} ${y2} ${duration}`);
      await this.sleep(duration + 1000);
      return true;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async screenShort(payload: { deviceId: string; fileName: string }) {
    const { deviceId } = payload;

    try {
      const device = this.client.getDevice(deviceId);
      await device.shell(`screencap -p /sdcard/Download/${payload.fileName}`);

      return `C:\\Users\\Thanhluc\\Nox_share\\Download\\${payload.fileName}`;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  async pullFile(payload: { deviceId: string; fileName: string }) {
    try {
      const remoteFilePath = `/sdcard/${payload.fileName}`;
      const localFilePath = this.getPathFileUpload(`${payload.fileName}`);
      const device = this.client.getDevice(payload.deviceId);

      device.pull(remoteFilePath).then((transfer) => {
        transfer.on('progress', (stats) => {
          console.log('Transfer progress', stats);
        });
        transfer.on('end', () => {
          console.log('Transfer complete');
        });

        transfer.pipe(fs.createWriteStream(localFilePath));
      });

      return true;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }

  getPathFileUpload(fileName) {
    const uploadPath = path.join(__dirname, '..', 'uploads'); // Thay đổi đường dẫn tùy ý
    const filePath = path.join(uploadPath, fileName);
    return filePath;
  }

  async key(payload: { deviceId: string; keyNumber: keyof typeof KEY }) {
    try {
      const device = this.client.getDevice(payload.deviceId);
      await device.shell(`input keyevent ${KEY[payload.keyNumber]}`);
      return true;
    } catch (error) {
      Logger.error(error);
      return error;
    }
  }
}
