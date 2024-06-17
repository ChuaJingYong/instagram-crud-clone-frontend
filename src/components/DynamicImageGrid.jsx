import { Row, Col, Image } from "react-bootstrap";

export default function DynamicImageGrid({ id_no }) {
  // Get the starting id
  // Create an array of posts from the starting id (6) and save as const images
  const images = [];
  // Prepare 6 image posts based on the starting id_no
  for (let i = id_no; i < id_no + 6; i++) {
    images.push(`https://picsum.photos/id/${i}/500/500`);
  }
  // console.log("IMAGES RESULT FROM DYNAMIC IMAGE GRID", images);

  const renderImages = () => {
    return images.map((imageUrl, index) => (
      <Col xs={12} md={4} key={index} className="mb-4">
        {/* <Col md={4} key={index} className="mb-4"> */}
        <Image src={imageUrl} fluid></Image>
      </Col>
    ));
  };

  return <Row>{renderImages()}</Row>;
}
