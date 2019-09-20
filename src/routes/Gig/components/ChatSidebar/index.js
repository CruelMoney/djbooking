import React, { useRef, useEffect } from "react";
import Sidebar, { SidebarContent } from "../../../../components/Sidebar";
import { Title } from "../../../../components/Text";
import styled from "styled-components";
import {
  Col,
  PillLarge,
  RowWrap,
  InfoPill
} from "../../../../components/Blocks";
import Chat, {
  MessageComposer,
  useChat
} from "../../../../components/common/Chat";
import { useQuery } from "react-apollo";
import { ME } from "../../../../components/gql";
import ContactPills from "../blocks/ContactPills";

const ChatSidebar = props => {
  const { loading, gig, theEvent } = props;
  const { loading: loadingMe, data } = useQuery(ME);
  const { me } = data || {};

  return (
    <Sidebar large stickyTop={"0px"}>
      <Content>
        <Header>
          <SidebarContent>
            <RowWrap between>
              <Title>Messages</Title>
              <PillsCol>
                {theEvent && (
                  <ContactPills
                    email={theEvent.contactEmail}
                    phone={theEvent.contactPhone}
                    showInfo={gig.showInfo}
                  />
                )}
              </PillsCol>
            </RowWrap>
          </SidebarContent>
        </Header>
        {loading || loadingMe ? null : <SmartChat {...props} me={me} />}
      </Content>
    </Sidebar>
  );
};

const PillsCol = styled(RowWrap)`
  justify-content: flex-end;
  margin-left: 24px;
  flex: 1;
  margin-bottom: -6px;
  > span {
    margin: 0;
    margin-bottom: 6px;
    margin-left: 6px;
  }
`;

const SmartChat = ({ me, organizer, gig, theEvent }) => {
  const messageWrapper = useRef();

  const sender = {
    id: me.id,
    name: me.userMetadata.firstName,
    image: me.picture.path
  };

  const receiver = {
    id: organizer.id,
    name: organizer.userMetadata.firstName,
    image: organizer.picture && organizer.picture.path
  };

  const scrollToBottom = () => {
    messageWrapper.current && messageWrapper.current.scrollTo(0, 999999);
  };

  useEffect(() => {
    console.log("effect");
    scrollToBottom();
  });

  const chat = useChat({
    sender,
    receiver,
    id: gig.id,
    showPersonalInformation: gig.showInfo,
    data: {
      eventId: theEvent.id
    }
  });

  return (
    <>
      <MessagesWrapper ref={messageWrapper}>
        <Chat
          hideComposer
          showPersonalInformation={gig.showInfo}
          eventId={theEvent.id}
          sender={sender}
          receiver={receiver}
          chatId={gig.id}
          chat={chat}
        />
      </MessagesWrapper>
      <MessageComposerContainer>
        <MessageComposer
          chat={chat}
          placeholder={`Message ${receiver.name}...`}
        />
      </MessageComposerContainer>
    </>
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
  border-bottom: 1px solid rgb(233, 236, 240, 0.5);
  z-index: 2;
  position: sticky;
  top: 0;
`;

const MessageComposerContainer = styled(Glass)`
  padding: 15px 24px;
  position: sticky;
  bottom: 0;
  border-top: 1px solid rgb(233, 236, 240, 0.5);
`;

const Content = styled(Col)`
  height: 100vh;
  justify-content: space-between;
`;

const MessagesWrapper = styled.div`
  position: sticky;
  bottom: 69px;
  flex: 1;
  padding-top: 102px;
  padding-bottom: 15px;
  overflow: scroll;
`;

export default ChatSidebar;
