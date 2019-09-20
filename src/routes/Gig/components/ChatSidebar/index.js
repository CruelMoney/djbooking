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
import { gigStates } from "../../../../constants/constants";
import moment from "moment";

const ChatSidebar = props => {
  const { loading, gig, theEvent } = props;
  const { loading: loadingMe, data } = useQuery(ME);
  const { me } = data || {};

  const disableScroll = () => {
    document.body.classList.add("popup-open");
  };
  const enableScroll = () => {
    document.body.classList.remove("popup-open");
  };

  return (
    <Sidebar
      large
      stickyTop={"0px"}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
    >
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

const PillsCol = styled(Col)`
  align-items: flex-end;
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

  useEffect(scrollToBottom);

  const chat = useChat({
    sender,
    receiver,
    id: gig.id,
    showPersonalInformation: gig.showInfo,
    data: {
      eventId: theEvent.id
    }
  });

  const systemMessage = getSystemMessage(gig);

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
          systemMessage={systemMessage}
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

const getSystemMessage = ({ expires, createdAt, status, directBooking }) => {
  const within = moment(expires).fromNow();

  if (directBooking && status === gigStates.REQUESTED) {
    return {
      systemMessage: true,
      createdAt: new Date(),
      content: `The organizer is waiting on your offer. \nThis is a direct booking from your profile and the Cueup fee is discarded.`,
      actions: ["DECLINE", "ACCCEPT"]
    };
  }

  const messages = {
    [gigStates.REQUESTED]: {
      systemMessage: true,
      createdAt: new Date(),
      content: `The organizer is waiting on your offer. \nMake an offer within ${within} or the gig will automatically be declined.`,
      actions: ["DECLINE", "ACCCEPT"]
    },
    [gigStates.ACCEPTED]: {
      systemMessage: true,
      createdAt: new Date(),
      content: `Waiting on confirmation from the organizer. \nYou can still update the offer if necessary.`,
      actions: ["UPDATE"]
    },
    [gigStates.CONFIRMED]: {
      systemMessage: true,
      createdAt: new Date(),
      content: `Whoop! The gig has been confirmed. \nMake sure that everything is agreed upon with the organizer, and get ready to play.`
    },
    [gigStates.FINISHED]: {
      systemMessage: true,
      createdAt: new Date(),
      content: `The gig is finished, we hope you had a good time. \nRemember to ask the organizer to leave a review.`
    },
    [gigStates.LOST]: {
      systemMessage: true,
      createdAt: new Date(),
      content: `Another DJ will play this gig. \nTo increase your chances of getting gigs, make sure that your profile is complete.`
    }
  };

  return messages[status];
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
  flex: 1;
  overflow: scroll;
  position: sticky;
  bottom: 69px;
  .chat {
    width: 100%;
    height: 100%;
    display: flex;
  }
  .messages {
    padding-top: 100px;
    padding-bottom: 15px;
  }
`;

export default ChatSidebar;
