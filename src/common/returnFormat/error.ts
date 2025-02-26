// error.ts

/**
 * 공통 에러 리턴 형식 인터페이스
 */
export interface ErrorResponse {
  code: number;
  message: string;
  utcTimeString: string;
  hasError: boolean;
}

export function createError(
  code: number,
  commonId: number,
  messageText: string,
): ErrorResponse {
  return {
    code: code,
    message: `${commonId} ${messageText}`,
    utcTimeString: new Date().toISOString(),
    hasError: false,
  };

  //   /**
  //  * 추가 에러 형식을 위한 인터페이스
  //  * ErrorResponse를 확장하여 errorDetails 필드를 추가함.
  //  */
  // export interface DetailedErrorResponse extends ErrorResponse {
  //   errorDetails: string[];
  // }

  // /**
  //  * 상세 에러 생성 함수
  //  * @param common_id - 식별자
  //  * @param message_text - 에러 메시지 내용
  //  * @param errorDetails - 상세 에러 정보 배열
  //  * @returns DetailedErrorResponse
  //  */
  // export function createDetailedError(
  //   common_id: string,
  //   message_text: string,
  //   errorDetails: string[]
  // ): DetailedErrorResponse {
  //   return {
  //     code: 1, // 예시로 다른 에러 코드를 사용 (필요에 따라 변경 가능)
  //     message: `${common_id} ${message_text}`,
  //     utcTimeString: new Date().toISOString(),
  //     hasError: true,
  //     errorDetails,
  //   };
}
