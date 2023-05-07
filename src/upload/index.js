import {
  Form,
  Divider,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import "./index.css";
import { useState } from "react";
import { API_URL } from "../config/constants.js";
import axios from "axios";
import { useHistory } from "react-router-dom";

function UploadPage() {
  const [imageUrl, setImageUrl] = useState(null);
  const history = useHistory();
  const onSubmit = (values) => {
    axios
      .post(`${API_URL}/products`, {
        name: values.name,
        price: parseInt(values.price),
        seller: values.seller,
        description: values.description,
        imageUrl: imageUrl,
      })
      .then((result) => {
        console.log(result);
        history.replace("/");
      })
      .catch((error) => {
        console.error(error);
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };
  const onChangeImage = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      const response = info.file.response;
      const imageUrl = response.imageUrl;
      setImageUrl(imageUrl);
    }
  };
  return (
    <div id="upload-container">
      <Form name="상품 업로드" onFinish={onSubmit}>
        <Form.Item
          name="upload"
          rules={[{ required: true, message: "상품 사진을 등록해주세요" }]}
          label={<div className="upload-label">상품 사진</div>}
        >
          <Upload
            name="image"
            action={`${API_URL}/image`}
            ListType="picture"
            showUploadList={false}
            onChange={onChangeImage}
          >
            {imageUrl ? (
              <img
                id="upload-image"
                src={`${API_URL}/${imageUrl}`}
                alt="업로드 상품 이미지"
              />
            ) : (
              <div id="upload-img-placeholder">
                <img src="/images/icons/camera.png" alt="업로드 상품 이미지" />
                <span>이미지를 업로드해주세요.</span>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          name="seller"
          rules={[{ required: true, message: "판매자 이름을 입력해주세요" }]}
          label={<div className="upload-label">판매자 명</div>}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="이름을 입력해주세요."
          ></Input>
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "상품 이름을 입력해주세요" }]}
          label={<div className="upload-label">상품 이름</div>}
        >
          <Input
            className="upload-name"
            size="large"
            placeholder="상품 이름을 입력해주세요."
          ></Input>
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          name="price"
          rules={[{ required: true, message: "상품 가격을 입력해주세요" }]}
          label={<div className="upload-label">상품 가격</div>}
        >
          <InputNumber
            className="upload-price"
            size="large"
            itialvalues={0}
            placeholder="0"
          ></InputNumber>
        </Form.Item>
        <Divider></Divider>
        <Form.Item
          name="description"
          rules={[{ required: true, message: "상품 정보를 입력해주세요" }]}
          label={<div className="upload-label">상품 정보</div>}
        >
          <Input.TextArea
            id="product-description"
            size="large"
            showCount
            maxLength={300}
            placeholder="상품 소개를 적어주세요"
          ></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <Button id="submit-button" size="large" htmlType="submit">
            상품 등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPage;
