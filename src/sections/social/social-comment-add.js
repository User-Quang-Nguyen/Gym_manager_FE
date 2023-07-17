import FaceSmileIcon from "@untitled-ui/icons-react/build/esm/FaceSmile";
import Link01Icon from "@untitled-ui/icons-react/build/esm/Link01";
import Attachment01Icon from "@untitled-ui/icons-react/build/esm/Attachment01";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import { useState } from "react";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  SvgIcon,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { useMockedUser } from "src/hooks/use-mocked-user";
import { getInitials } from "src/utils/get-initials";

export const SocialCommentAdd = (props) => {
  const { parentId, createPost, ...other } = props;
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const user = useMockedUser();


  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  }
  const onClickSend = async () => {
    const postContent = value;
    if (!postContent) return;
    const post = {
      "content": postContent,
      "created_at": new Date().toISOString(),
      "parent_feedback_id": parentId,
      "user_id": user.id
    };
    createPost(post);
    await setValue("");
  };

  return (
    <div {...props}>
      <Stack alignItems="flex-start" direction="row" spacing={2}>
        <Avatar
          src={user.avatar}
          sx={{
            height: 40,
            width: 40,
          }}
        >
          {getInitials(user.name)}
        </Avatar>
        <Stack spacing={3} sx={{ flexGrow: 1 }}>
          <TextField
            fullWidth
            multiline
            value={value}
            placeholder="Type your reply"
            rows={3}
            variant="outlined"
            onChange={handleChange}
          />
          <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
            <Stack alignItems="center" direction="row" spacing={1}>
              {!smUp && (
                <IconButton>
                  <SvgIcon>
                    <PlusIcon />
                  </SvgIcon>
                </IconButton>
              )}
              {smUp && (
                <>
                  <IconButton>
                    <SvgIcon>
                      <Image01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Attachment01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <Link01Icon />
                    </SvgIcon>
                  </IconButton>
                  <IconButton>
                    <SvgIcon>
                      <FaceSmileIcon />
                    </SvgIcon>
                  </IconButton>
                </>
              )}
            </Stack>
            <div>
              <Button variant="contained" onClick={onClickSend}>
                Send
              </Button>
            </div>
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};
