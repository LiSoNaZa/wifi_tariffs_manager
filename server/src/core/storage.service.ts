import { CoreModel } from "../interfaces/core"

export class BaseStorageService<T extends CoreModel> {
  private _storage : T[] = []
  private _lastId: number = 0

  constructor(initData: T[] = []) {
    this._storage = [...initData]
    this._lastId = this._storage.length > 0 ? this._storage[this._storage.length - 1].id : 0
  }

  
  /**
   * Basic implementation to load all Data
   *
   * @returns {T[]} 
   */
  getAll(): T[] {
    return this._storage.filter((item: T) => item.deletedAt === null)
  }

  
  /**
   * Basic implementation to load specific Data
   *
   * @param {number} id 
   * @returns {(T | undefined)} 
   */
  getById(id: number): T | undefined {
    return this._storage.find((item: T) => item.id === id && item.deletedAt === null)
  }

  
  /**
   * Basic implementation to create a new entry
   *
   * @param {T} item 
   * @returns {(T | undefined)} 
   */
  create(item: T): T | undefined {
    this._lastId++
    item.id = this._lastId
    item.createdAt = new Date()
    item.updatedAt = new Date()
    item.deletedAt = null
    this._storage.push(item)
    return this._storage.find((item: T) => item.id === this._lastId)
  }

  
  /**
   * Basic implementation to update specific entry
   *
   * @param {number} id 
   * @param {Partial<T>} updates 
   * @returns {(T | null)} 
   */
  update(id: number, updates: Partial<T>): T | null {
    const index = this._storage.findIndex((item: T) => item.id === id && item.deletedAt === null)
    if (index === -1) return null
    this._storage[index] = {...this._storage[index], ...updates, updatedAt: new Date()}
    return this._storage[index]
  }

  /**
   * Basic implementation to delete specific enrty
   * @param id 
   * @returns 
   */
  delete(id: number): T | null {
    const index = this._storage.findIndex((item: T) => item.id === id && item.deletedAt === null)
    if (index === -1) return null
    this._storage[index].deletedAt = new Date()
    return this._storage[index]
  }
}