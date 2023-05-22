import AWS from 'aws-sdk';

const {
  REACT_APP_REGION,
  REACT_APP_ACCESSKEY_ID,
  REACT_APP_SECRETACCESSKEY,
} = process.env;

AWS.config.update({
  region: REACT_APP_REGION,
  accessKeyId: REACT_APP_ACCESSKEY_ID,
  secretAccessKey: REACT_APP_SECRETACCESSKEY,
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const S3 = new AWS.S3();

const dbName = 'TF_database';

const params = {
  TableName: dbName,
};

const main_case_params = {
  TableName: dbName,
  Limit: 6,
  ScanIndexForward: false,
  IndexName: 'result-index',
  KeyConditionExpression: "#res = :result",
  ExpressionAttributeNames: {
    "#res": "result"
  },
  ExpressionAttributeValues: {
    ":result": 'danger'
  }
}

const case_params = {
  TableName: dbName,
  ScanIndexForward: false,
  IndexName: 'result-index',
  KeyConditionExpression: "#res = :result",
  ExpressionAttributeNames: {
    "#res": "result"
  },
  ExpressionAttributeValues: {
    ":result": 'danger'
  }
}

const email_params = ({email}) => {
  const params ={
    TableName: dbName,
    KeyConditionExpression: "client_email = :client_email",
    ExpressionAttributeValues: {
        ":client_email": email
    }
  }
  return params
}

const onClickDownloadCsvBtc = async ({collectionName}) => {
  //s3://threef-bucket/result_csv/{collectionName}.csv
  const params = {
    Bucket: 'threef-bucket',
    Key: `result_csv/${collectionName}.csv`,
  };
  console.log(`result_csv/${collectionName}.csv`);

  S3.getObject(params, (error, data) => {
    if (error) {
      console.error('다운로드 중 오류가 발생했습니다:', error);
      return;
    }
    const url = window.URL.createObjectURL(new Blob([data.Body]));
    const link = document.createElement('a');
    link.href = url;
    link.download = `result.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
}



export {
  dynamoDB, 
  params, 
  main_case_params, 
  case_params,
  email_params,
  onClickDownloadCsvBtc,
};