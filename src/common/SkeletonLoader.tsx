import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Stack from '@mui/joy/Stack';
import Card from '@mui/joy/Card';
import Skeleton from '@mui/joy/Skeleton';
import Typography from '@mui/joy/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

interface SkeletonLoaderProps {
  loading: boolean;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ loading }) => {
  return (
    <Box>
      {loading && (
        <Box   sx={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 1300,
          }}>
          <LinearProgress />
        </Box>
      )}
      <Stack spacing={2} useFlexGap sx={{ mt: loading ? 4 : 0 }}>
        <Card variant="outlined">
          <AspectRatio ratio="10/2">
            <Skeleton loading={loading} variant="overlay">
              <img
                alt="Forest road"
                src="https://images.unsplash.com/photo-1686548812883-9d3777f4c137?h=400&fit=crop&auto=format&dpr=2"
              />
            </Skeleton>
          </AspectRatio>
          <Typography>
            <Skeleton loading={loading}>
              An aerial view of a road in the middle of a forest. This image was uploaded by Dian Yu on Unsplash.
            </Skeleton>
          </Typography>
        </Card>
      </Stack>
    </Box>
  );
}

export default SkeletonLoader;
