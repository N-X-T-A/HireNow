import { Box, H1, Text, Illustration } from "@adminjs/design-system";

const MainDashboard = () => {
  return (
    <Box variant="grey">
      <Box variant="white" py="xl" px="xxl">
        <H1>Welcome to HireNow Admin</H1>
        <Text mt="lg">
          This is your management dashboard. Customize it however you like!
        </Text>
      </Box>

      <Box variant="white" mt="xl" py="xl" px="xxl">
        <Illustration variant="Rocket" />
      </Box>
    </Box>
  );
};

export default MainDashboard;
