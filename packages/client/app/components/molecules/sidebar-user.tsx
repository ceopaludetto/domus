import type { ButtonBaseProps } from "@mui/material";
import type { User } from "@prisma/client";

import { getNameAbbreviation } from "@domus/utils";
import { Badge, IconButton, Box, Avatar, Stack } from "@mui/material";
import { Form } from "@remix-run/react";
import { Bell, LogOut, Search } from "lucide-react";

import { Tooltip } from "../atoms";

export type ISidebarUserProps = ButtonBaseProps & {
  user: User;
};

export function SidebarUser({ user }: ISidebarUserProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Tooltip describeChild title={user.firstName}>
        <IconButton size="small">
          <Avatar
            sx={{
              fontWeight: "medium",
              backgroundColor: "secondary.main",
              color: "secondary.contrastText",
              height: 46,
              width: 46,
            }}
          >
            {getNameAbbreviation(user.firstName)}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Stack direction="row" spacing={2}>
        <Tooltip describeChild title="Notificações">
          <IconButton>
            <Badge badgeContent={2} color="primary">
              <Bell />
            </Badge>
          </IconButton>
        </Tooltip>
        <Tooltip describeChild title="Pesquisa">
          <IconButton>
            <Search />
          </IconButton>
        </Tooltip>
        <Form method="post">
          <input type="hidden" name="subaction" value="logout" />
          <Tooltip describeChild title="Sair">
            <IconButton type="submit" color="error">
              <LogOut />
            </IconButton>
          </Tooltip>
        </Form>
      </Stack>
    </Box>
  );
}
