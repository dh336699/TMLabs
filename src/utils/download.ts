import { httpRequest } from "./axios";

const downloadFile = ({url, cors = false, fileName = '分析报告.pdf'}: { url: string; cors?: boolean; fileName?: string }) => {
    if (!cors) {
        dowloadWithAnchor(url, fileName)
    } else {
        downloadWithToken(url, fileName)
    }
}

const downloadWithToken = async (url: string, fileName: string) => {
    try {
        const fileResponse = await httpRequest(url);

        const blob = await fileResponse.blob();

        const downloadUrl = window.URL.createObjectURL(blob);
        dowloadWithAnchor(downloadUrl, fileName)
        
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('下载失败:', error);
    }
}

const dowloadWithAnchor = async (downloadUrl:string, fileName: string) => {
try {
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = fileName; // 强制指定文件名
    
    // 4. 触发下载
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (error) {
    console.error('下载失败:', error);
  }
}

export { downloadFile }