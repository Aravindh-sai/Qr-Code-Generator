"use client"
import React, { useState, useRef } from 'react'
import QRCode from 'qrcode'

export default function Home() {
  const [url, setUrl] = useState('')
  const [qrCodeData, setQrCodeData] = useState('')
  const downloadRef = useRef<HTMLAnchorElement>(null)

  const generateQRCode = async () => {
    if (!url) {
      alert('Please enter a URL')
      return
    }
    try {
      const dataUrl = await QRCode.toDataURL(url)
      setQrCodeData(dataUrl)
    } catch (err) {
      console.error(err)
      alert('Failed to generate QR code')
    }
  }

  const downloadQRCode = () => {
    if (downloadRef.current && qrCodeData) {
      downloadRef.current.href = qrCodeData
      downloadRef.current.download = 'qrcode.png'
      downloadRef.current.click()
    }
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: 'auto',
      padding: 20,
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h1 style={{ color: '#333' }}>QR Code Generator</h1>
      <input
        type="text"
        placeholder="Enter URL here"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          fontSize: 16,
          boxSizing: 'border-box',
          borderRadius: 4,
          border: '1px solid #ccc',
          marginBottom: 10,
        }}
      />
      <button
        onClick={generateQRCode}
        style={{
          width: '100%',
          padding: '10px 0',
          fontSize: 16,
          cursor: 'pointer',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          marginBottom: 10,
        }}
      >
        Generate QR Code
      </button>
      {qrCodeData && (
        <>
          <img
            src={qrCodeData}
            alt="QR Code"
            style={{ marginTop: 20, width: 300, height: 300, alignSelf: 'center' }}
          />
          <button
            onClick={downloadQRCode}
            style={{
              marginTop: 10,
              padding: '10px 20px',
              fontSize: 16,
              cursor: 'pointer',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: 5,
              display: 'block',
              width: '100%',
            }}
          >
            Download QR Code
          </button>
          <a ref={downloadRef} style={{ display: 'none' }}>Download</a>
        </>
      )}
    </div>
  )
}
