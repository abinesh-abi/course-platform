import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';

function CourseItems({title,content,date}) {
     return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.DPFdk5otPXM70c0w5tZAqQHaDp%26pid%3DApi&f=1&ipt=0ad0f64253c7dfc861714b204472ddf231ff47f99e960025e6ec69684ba04982&ipo=images"
          alt="course"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
          <Typography variant="body1" marginTop={'10px'}>
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
            View
        </Button> */}
      </CardActions>
    </Card>
  );
}

export default CourseItems