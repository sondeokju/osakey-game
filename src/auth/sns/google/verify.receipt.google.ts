import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// Google API 인증
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'service-account.json'), // JSON 키 파일 경로
  scopes: ['https://www.googleapis.com/auth/androidpublisher'],
});

// Google Play API 초기화
const androidPublisher = google.androidpublisher({ version: 'v3', auth });

/**
 * Google Play 영수증 검증 함수
 * @param {string} packageName - 앱의 패키지 이름
 * @param {string} productId - 상품 ID
 * @param {string} token - 영수증 토큰
 * @returns {Promise<Object>} - 검증 결과
 */
async function verifyReceipt(packageName, productId, token) {
  try {
    const res = await androidPublisher.purchases.products.get({
      packageName, // 앱의 패키지 이름
      productId, // 상품 ID
      token, // 영수증 토큰
    });

    if (res.data.purchaseState === 0) {
      // 구매 성공
      return {
        success: true,
        data: res.data,
      };
    } else {
      // 구매 실패
      return {
        success: false,
        message: 'Purchase not valid',
      };
    }
  } catch (error) {
    console.error('Error verifying receipt:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}

// 예제 사용법
(async () => {
  const packageName = 'com.example.game'; // 앱의 패키지 이름
  const productId = 'example_product_id'; // 상품 ID
  const token = 'example_receipt_token'; // 영수증 토큰 (클라이언트에서 전송)

  const result = await verifyReceipt(packageName, productId, token);
  console.log('Verification result:', result);
})();
