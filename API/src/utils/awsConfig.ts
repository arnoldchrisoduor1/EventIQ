import aws from "aws-sdk";
import { nanoid } from "nanoid";

// Setting up aws s3 buckets.
export const s3 = new aws.S3({
    region: "eu-north-1",
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  export const generateUploadURL = async () => {
    console.log("Generating the image upload url");
    // const { nanoid } = await import("nanoid"); 
    const date = new Date();
    const imageName = `${nanoid()}-${date.getTime()}.jpeg`;
    return await s3.getSignedUrlPromise("putObject", {
      Bucket: "kenyamall",
      Key: imageName,
      Expires: 1000,
      ContentType: "image/jpeg",
    });
  };

  export const getImgUrl = async (req, res) => {
    generateUploadURL()
    .then((url) => res.status(200).json({ uploadURL: url }))
    .catch((err) => {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    });
  }