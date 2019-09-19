import React from "react";
import Sidebar, { SidebarContent } from "../../../../components/Sidebar";
import { Title } from "../../../../components/Text";
import styled from "styled-components";
import { Col } from "../../../../components/Blocks";
import Chat from "../../../../components/common/Chat";
import LoadingPlaceholder, {
  LoadingPlaceholder2
} from "../../../../components/common/LoadingPlaceholder";
import { useQuery } from "react-apollo";
import { ME } from "../../../../components/gql";

const ChatSidebar = props => {
  const { theEvent, gig, organizer, loading } = props;
  const { loading: loadingMe, data } = useQuery(ME);

  const { me } = data || {};

  return (
    <Sidebar large stickyTop={"0px"}>
      <Content>
        <SidebarContent>
          <Title>Messages</Title>
        </SidebarContent>
        {loading || loadingMe ? (
          <SidebarContent>
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </SidebarContent>
        ) : (
          <Chat
            showPersonalInformation={gig.showInfo}
            eventId={theEvent.id}
            sender={{
              id: me.id,
              name: me.userMetadata.firstName,
              image: me.picture.path
            }}
            receiver={{
              id: organizer.id,
              name: organizer.userMetadata.firstName,
              image: organizer.picture && organizer.picture.path
            }}
            chatId={gig.id}
          />
        )}
        <MessageComposer>
          <SidebarContent>Send a message</SidebarContent>
        </MessageComposer>
      </Content>
    </Sidebar>
  );
};

const MessageComposer = styled.div`
  min-height: 84px;
  border-top: 1px solid #e9ecf0;
  position: sticky;
  bottom: 0;
`;

const Content = styled(Col)`
  height: 100vh;
  justify-content: space-between;
`;

export default ChatSidebar;
