import axios from "axios";

const KEY = "";

interface CAresponse {
  status: string;
  data: {
    token: string;
  };
}

interface GDresponse {
  status: string;
  data: {
    id: string;
    type: string;
    name: string;
    parentFolder: string;
    code: string;
    createTime: number;
    public: boolean;
    childs: string[];
    totalDownloadCount: number;
    totalSize: number;
    contents: any;
  };
}

interface Finalresponse {
  id: string;
  type: string;
  name: string;
  parentFolder: string;
  createTime: number;
  size: number;
  downloadCount: number;
  md5: string;
  mimetype: string;
  serverChoosen: string;
  directLink: string;
  link: string;
}

const goConf = {
  headers: {
    "Content-Type": "application/json",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" +
      " (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36",
    Origin: "https://gofile.io",
    Referer: "https://gofile.io/",
  },
};

async function getToken() {
  const resp = await axios.get("https://api.gofile.io/createAccount", goConf);
  try {
    return (resp.data as CAresponse).data.token;
  } catch (err) {
    console.error(err);
  }
}

async function getData(contentId: string, token: string) {
  const resp = await axios.get(
    `https://api.gofile.io/getContent?contentId=${contentId}&token=${token}`,
    goConf
  );
  try {
    return (resp.data as GDresponse).data.contents;
  } catch (err) {
    console.error(err);
  }
}

(async () => {
  const token = await getToken();
  const data = await getData(KEY, token!);
  console.log((data[Object.keys(data)[0]] as Finalresponse).link);
})();
