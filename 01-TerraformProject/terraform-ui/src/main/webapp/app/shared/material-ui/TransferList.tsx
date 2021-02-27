import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto'
    },
    paper: {
      width: 400,
      height: 150,
      overflow: 'auto'
    },
    button: {
      margin: theme.spacing(0.2, 0)
    }
  })
);

function not(a: number[], b: number[]) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a: number[], b: number[]) {
  return a.filter(value => b.indexOf(value) !== -1);
}

function notInObjs(sourceList: any,  listToRemove: any) {
    // return a.filter(value => b.indexOf(value) === -1);
    const finalList = sourceList.filter(source =>
            listToRemove.filter(remove => remove.value === source.value).length === 0
    );

    return finalList;
  }

  function intersectionObjs(checkedList: any,  itemList: any) {
    // return a.filter(value => b.indexOf(value) !== -1);
    const finalList = checkedList.filter(checkedObj =>
        itemList.filter(item => item.value === checkedObj.value).length !== 0
    );

    return finalList;
  }

export default function TransferList(inpProps: any) {
    console.log('inpProps === ', inpProps);
  const classes = useStyles();
  const [checked, setChecked] = React.useState<any>([]);
  const [left, setLeft] = React.useState<any>(inpProps.transfrProps.left);
  const [right, setRight] = React.useState<any>(inpProps.transfrProps.right);

  const leftChecked = intersectionObjs(checked, left);
  const rightChecked = intersectionObjs(checked, right);

  const handleToggle = (value: any) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(notInObjs(left, leftChecked));
    setChecked(notInObjs(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(notInObjs(right, rightChecked));
    setChecked(notInObjs(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: any) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map(item => {
          const labelId = `transfer-list-item-${item.value}-label`;

          return (
            <ListItem key={item.value} role="listitem" button onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(item) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`${item.label}`} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            variant="outlined"
            size="small"
            className={classes.button}
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
