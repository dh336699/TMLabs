import { httpRequest } from "./axios";

const downloadFile = ({url, cors = false}: { url: string; cors?: boolean}) => {
    if (!cors) {
        dowloadWithAnchor(url)
    } else {
        downloadWithToken(url)
    }
}

const downloadWithToken = async (url: string) => {
    try {
        const fileResponse = await httpRequest(url);

        const blob = await fileResponse.blob();

        const downloadUrl = window.URL.createObjectURL(blob);
        dowloadWithAnchor(downloadUrl)
        
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('下载失败:', error);
    }
}

const dowloadWithAnchor = async (downloadUrl:string) => {
try {
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = '分析报告.pdf'; // 强制指定文件名
    
    // 4. 触发下载
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (error) {
    console.error('下载失败:', error);
  }
}

export { downloadFile }