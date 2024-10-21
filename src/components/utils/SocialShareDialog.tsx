import {
  Button,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  XIcon,
  LinkedinIcon,
  LinkedinShareButton,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import CloseIcon from "@mui/icons-material/Close";
import { useNotifications } from "@toolpad/core";

export function SocialShareDialog({
  payload,
  open,
  onClose,
}: DialogProps & { payload: number }) {
  const { protocol, host } = location;
  const url = `${protocol}//${host}/recipes/${payload}/show`;
  const notifications = useNotifications();

  const handleClose = (
    event: never,
    reason?: "backdropClick" | "escapeKeyDown"
  ) => onClose && onClose(event, reason ?? "escapeKeyDown");

  const handleCopy = () => {
    navigator.clipboard
      .writeText(url)
      .then(() =>
        notifications.show("Url copied to clipboard", { severity: "info" })
      )
      .catch(() =>
        notifications.show("Unable to copy url", { severity: "error" })
      );
  };
  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle>Share in social media</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Stack gap={2}>
          <Stack direction={"row"} spacing={1}>
            <EmailShareButton url={url} body="">
              <EmailIcon round />
            </EmailShareButton>
            <FacebookShareButton url={url}>
              <FacebookIcon round />
            </FacebookShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon round />
            </LinkedinShareButton>
            <TelegramShareButton url={url}>
              <TelegramIcon round />
            </TelegramShareButton>
            <TwitterShareButton url={url}>
              <XIcon round />
            </TwitterShareButton>
            <WhatsappShareButton url={url}>
              <WhatsappIcon round />
            </WhatsappShareButton>
          </Stack>
          <Stack
            direction={"row"}
            spacing={0.5}
            sx={{
              alignItems: "center",
              borderColor: (theme) => theme.palette.divider,
              borderStyle: "solid",
              padding: "0.5rem 1rem",
              borderWidth: "0.125rem",
            }}
          >
            <Typography
              variant="body1"
              component={"span"}
              sx={{ flexShrink: 1, flexGrow: 1, overflow: "hidden" }}
            >
              {url}
            </Typography>
            <Button
              variant="contained"
              disableElevation
              sx={{ borderRadius: "1.5rem" }}
              onClick={handleCopy}
            >
              Copy
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
