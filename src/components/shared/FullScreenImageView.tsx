import { FC } from "react";
import { Modal, Fade } from "@mui/material";

interface ImageProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const FullScreenImageView: FC<ImageProps> = ({ src, onClose, alt }) => {
  return (
    <Modal
      open
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <Fade
        in
        timeout={300}
        style={{
          transitionDelay: "100ms",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <img
          src={src}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
          }}
          alt={alt}
          onClick={onClose}
        />
      </Fade>
    </Modal>
  );
};

export default FullScreenImageView;
