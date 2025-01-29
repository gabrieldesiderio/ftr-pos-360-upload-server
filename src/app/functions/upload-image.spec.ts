import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { isRight } from '@/shared/either'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { uploadImage } from './upload-image'

describe('upload image', () => {
  beforeAll(() => {
    vi.mock('@/infra/storage/upload-file-to-storage', () => {
      return {
        uploadFileToStorage: vi.fn().mockImplementation(() => {
          return {
            key: `${randomUUID()}.jpg`,
            url: 'https://storage.com/image.jpg',
          }
        }),
      }
    })
  })

  it('should be able to upload an image', async () => {
    const result = await uploadImage({
      fileName: 'file.jpg',
      contentType: 'image/jpg',
      contentStream: Readable.from([]),
    })

    expect(isRight(result)).toBe(true)
  })
})
