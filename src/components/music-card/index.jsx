import {
  Box,
  Button,
  Flex,
  Image,
  Link,
  Skeleton,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlay } from "react-icons/fa";
import MotionBox from "../motion-box";
const MusicCard = ({ data, isSelected, handleSelect }) => {
  const { album, artists, external_urls, name } = data;
  //notice that one music can have more than 1 artist
  const artistText = artists.map((artist, idx) => {
    const isLast = idx === artists.length - 1;
    const text = isLast ? artist.name : artist.name + ", ";
    return (
      <Link isExternal href={artist.external_urls.spotify} key={artist.id}>
        {text}
      </Link>
    );
  });
  const buttonSize = useBreakpointValue(["sm", "md"]);
  const itemVariant = {
    hidden: { y: 15, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };
  return (
    <MotionBox
      variants={itemVariant}
      d="flex"
      role="group"
      p="2"
      border="1px solid rgba(255, 255, 255, 0.1)"
      borderRadius="5px"
      transition="all ease 0.15s"
      gridGap={4}
      _hover={{
        bgColor: "#272727",
      }}
    >
      <Flex boxSize={["80px", "125px"]} pos="relative">
        <Link href={data.uri}>
          <Image
            _groupHover={{ opacity: 0.7 }}
            fallback={<Skeleton boxSize={["80px", "125px"]} />}
            boxSize={["80px", "125px"]}
            src={album.images[1].url}
            alt={album.name}
          />
          <Box
            pos="absolute"
            d="none"
            _groupHover={{ d: "block" }}
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            fontSize="3xl"
          >
            <FaPlay />
          </Box>
        </Link>
      </Flex>
      <Flex flex={1} flexDir="column" justifyContent="space-between">
        <Flex flexDir="column">
          <Text as="h4" fontWeight="bold" fontSize={["sm", "md"]} noOfLines={2}>
            <Link isExternal href={external_urls.spotify}>
              {name}
            </Link>{" "}
            - {artistText}
          </Text>
          <Text as="h5" fontSize={["sm", "md"]} noOfLines={1}>
            <Link isExternal href={album.external_urls.spotify}>
              {album.name}
            </Link>
          </Text>
        </Flex>
        <Flex>
          <Button
            size={buttonSize}
            colorScheme={isSelected ? "gray" : "brand"}
            color={isSelected ? "gray.700" : "inherit"}
            variant="solid"
            onClick={() => handleSelect(data.uri)}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default MusicCard;
