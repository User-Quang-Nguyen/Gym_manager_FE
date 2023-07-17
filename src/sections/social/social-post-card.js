import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import ClockIcon from "@untitled-ui/icons-react/build/esm/Clock";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Link,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { SocialComment } from "./social-comment";
import { SocialCommentAdd } from "./social-comment-add";

export const SocialPostCard = (props) => {
  const { postId, authorAvatar, authorName, comments, createdAt, message, createPost, ...other } =
    props;

  return (
    <Card {...other}>
      <CardHeader
        avatar={<Avatar component="a" href="#" src={authorAvatar} />}
        disableTypography
        subheader={
          <Stack alignItems="center" direction="row" spacing={1}>
            <SvgIcon color="action">
              <ClockIcon />
            </SvgIcon>
            <Typography color="text.secondary" variant="caption">
              {/* {formatDistanceToNowStrict(createdAt)} ago */}
              {createdAt} ago
            </Typography>
          </Stack>
        }
        title={
          <Stack alignItems="center" direction="row" spacing={0.5} sx={{ mb: 1 }}>
            <Link color="text.primary" href="#" variant="subtitle2">
              {authorName}
            </Link>
            <Typography variant="body2">updated status</Typography>
          </Stack>
        }
      />
      <Box
        sx={{
          pb: 2,
          px: 3,
        }}
      >
        <Typography variant="body1">{message}</Typography>

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ mt: 2 }}
        ></Stack>
        <Divider sx={{ my: 3 }} />
        <Stack spacing={3}>
          {comments.map((comment) => (
            <SocialComment
              authorAvatar={comment.author.avatar}
              authorName={comment.author.name}
              createdAt={comment.createdAt}
              key={comment.id}
              message={comment.message}
            />
          ))}
        </Stack>
        <Divider sx={{ my: 3 }} />
        <SocialCommentAdd parentId={postId} createPost={createPost} />
      </Box>
    </Card>
  );
};

SocialPostCard.propTypes = {
  authorAvatar: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  createdAt: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  likes: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired,
};
