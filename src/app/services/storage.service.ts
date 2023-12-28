import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {}

  public async set(key: string, value: any) {
    const st = await this.storage.create();
    await st.set(key, value);
  }

  public async get(key: string) {
    const st = await this.storage.create();
    return await st.get(key);
  }

  public async remove(key: string) {
    const st = await this.storage.create();
    return await st.remove(key);
  }
}
