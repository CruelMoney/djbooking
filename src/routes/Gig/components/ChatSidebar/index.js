import React from "react";
import Sidebar, { SidebarContent } from "../../../../components/Sidebar";
import { Title } from "../../../../components/Text";
import styled from "styled-components";
import { Col } from "../../../../components/Blocks";
import Chat, { MessageComposer } from "../../../../components/common/Chat";
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
        <Header>
          <SidebarContent>
            <Title>Messages</Title>
          </SidebarContent>
        </Header>

        {loading || loadingMe ? (
          <SidebarContent>
            <LoadingPlaceholder />
            <LoadingPlaceholder />
          </SidebarContent>
        ) : (
          <Chat
            hideComposer
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
        <MessageComposerContainer>
          <SidebarContent>
            <MessageComposer></MessageComposer>
          </SidebarContent>
        </MessageComposerContainer>
      </Content>
    </Sidebar>
  );
};

const Glass = styled.div`
  background: #fff;
  @supports (backdrop-filter: none) {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: saturate(180%) blur(20px);
  }
`;

const Header = styled(Glass)`
  min-height: 108px;
  border-bottom: 1px solid rgb(233, 236, 240, 0.5);
  z-index: 2;
  position: sticky;
  top: 0;
`;

const MessageComposerContainer = styled(Glass)`
  min-height: 84px;
  position: sticky;
  bottom: 0;
  border-top: 1px solid rgb(233, 236, 240, 0.5);
`;

const Content = styled(Col)`
  height: 100vh;
  justify-content: space-between;
  .messages {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    padding-bottom: 100px;
  }
`;

export default ChatSidebar;
