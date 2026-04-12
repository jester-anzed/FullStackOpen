const { test, expect, beforeEach, describe } = require('@playwright/test')
import {loginWith} from './test_helper'

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { 
      data: {
        name: "Jester Ismael",
        username: "Jester",
        password: "test123456"
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })


  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      loginWith(page, 'Jester', 'test123456')

      await expect(page.getByText('Jester logged in')).toBeVisible()
      await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
      
    })

    test('fails with wrong credentials', async ({ page }) => {
      loginWith(page, 'Jester', 'wrong')

      const error = page.locator('.error')
      await expect(error).toContainText('wrong credentials')
    })
  })


  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'Jester', 'test123456')
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'Create New Blog'}).click()
    await expect(page.getByLabel('Title:')).toBeVisible()
    await expect(page.getByLabel('Author:')).toBeVisible()
    await expect(page.getByLabel('Url:')).toBeVisible()

    await page.getByLabel('Title:').fill('Studying Today')
    await page.getByLabel('Author:').fill('Jester')
    await page.getByLabel('Url:').fill('www.productive.com')

    await page.getByRole('button', { name: 'Create' }).click()


    const success = page.locator('.success')
    await expect(page.getByText('Studying Today Jester')).toBeVisible()
    await expect(success).toContainText('a new blog Studying Today by Jester added')

  })
})
})