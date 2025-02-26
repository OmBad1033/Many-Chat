export type InstagramPostProps = {
  id: string;
  timestamp: Date;
  caption?: string;
  media_url: string;
  media_type: "IMAGE" | "VIDEO" | "CAROSEL_ALBUM";
};
