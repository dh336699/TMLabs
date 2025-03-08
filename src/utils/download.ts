import { isNil, omitBy } from "lodash";
import { httpRequest } from "./axios";

type CommonVO = {
    url: string;
    cors?: boolean;
    fileName?: string;
    fileType?: string;
    baseURL?:string;
    cb?: () => void;
}
const downloadFile = ({url, cors = false, fileName = '性格分析报告.pdf', fileType = 'application/pdf', baseURL, cb}: CommonVO) => {
    if (!cors) {
        dowloadWithAnchor({url, fileName, cb})
    } else {
        downloadWithToken({url, fileName, fileType, baseURL, cb})
    }
}

const downloadWithToken = async ({url, fileName, fileType, baseURL, cb}: CommonVO) => {
    try {
        const response = await httpRequest(url, omitBy({ baseURL, responseType: 'blob' }, isNil));

        const blob = new Blob([response.data], { type: fileType });

        const downloadUrl = window.URL.createObjectURL(blob);
        const fileOriginName = fileName || getFileNameFromHeaders(response.headers) || fileName;
        dowloadWithAnchor({url: downloadUrl, fileName: fileOriginName, cb})
        
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('下载失败:', error);
    }
}

const dowloadWithAnchor = async ({url, fileName, cb}: CommonVO) => {
    try {
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = fileName!; // 强制指定文件名
        
        // 4. 触发下载
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        cb && cb()
    } catch (error) {
        console.error('下载失败:', error);
    }
}

// 从响应头解析文件名（处理中文编码）
const getFileNameFromHeaders = (headers: any) => {
    const disposition = headers['content-disposition'];
    if (!disposition) return null;
    
    const utf8FilenameRegex = /filename\*=UTF-8''([\w%\-\.]+)(?:; ?|$)/i;
    const asciiFilenameRegex = /filename=(["']?)(.*?[^\\])\1(?:; ?|$)/i;
  
    let fileName: string | null = null;
    
    if (utf8FilenameRegex.test(disposition)) {
      fileName = decodeURIComponent(utf8FilenameRegex.exec(disposition)![1]);
    } else {
      const matches = asciiFilenameRegex.exec(disposition);
      if (matches && matches[2]) {
        fileName = matches[2];
      }
    }
    
    return fileName;
  };

export { downloadFile }
