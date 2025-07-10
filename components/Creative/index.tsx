"use client"
import { KeyboardProvider } from '@/store/Keyboard'
import { LayersPanel } from './panels/layersPanel'


export default function CreativeClient() {
  return (
    <>
    <KeyboardProvider id="layersPanel">
          <LayersPanel />
        </KeyboardProvider>
    </>
  )
}