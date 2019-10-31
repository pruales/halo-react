import React from "react"
import { fetchCollection, addItem } from '../services/collectionService';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    card: {
        maxWidth: 400,
        paddingTop: '24px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
});



class Collection extends React.Component {
    state = {
        loading: false,
        collection: [],
        openAddModal: false,
        newItem: {
            key: '',
            value: ''
        }
    }

    componentDidMount() {
        this.fetchItems()
    }

    fetchItems() {
        fetchCollection().then(res => {
            this.setState({ collection: res.data })

        }, err => console.log(err.response))
    }

    handleUpdate = event => {
        let newItemCopy = Object.assign({}, this.state.newItem)
        newItemCopy[event.target.name] = event.target.value
        this.setState({
          newItem: newItemCopy
        })
    }

    handleAddCancel() {
        this.setState({openAddModal: false});
        console.log('closing');
        let newItemClear = Object.assign({}, this.state.newItem);
        newItemClear.key = '';
        newItemClear.value = '';

        this.setState({
            newItem: newItemClear
        })
    }

    handleAdd() {
        console.log(this.state.newItem)
        addItem(this.state.newItem).then(res => {
            console.log(res)
            let newItemClear = Object.assign({}, this.state.newItem);
            newItemClear.key = '';
            newItemClear.value = '';

            this.setState({
                newItem: newItemClear
            });

            this.fetchItems();
            this.setState({openAddModal: false});
        })

    }
    render() {
        const { classes } = this.props;
        return (
            <>
                <Modal
                    aria-labelledby="add-item-modal"
                    className={classes.modal}
                    open={this.state.openAddModal}
                    onClose={this.handleAddCancel.bind(this)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={this.state.openAddModal}>
                    <div className={classes.paper}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="key"
                            label="Key"
                            name="key"
                            autoFocus
                            onChange={this.handleUpdate}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="value"
                            label="Value"
                            id="value"
                            onChange={this.handleUpdate}
                        />
                        <Button 
                            style={{marginTop:'12px'}} 
                            variant="contained" 
                            color="secondary" 
                            onClick={this.handleAdd.bind(this)}
                        > Save </Button>
                    </div>
                    </Fade>
                </Modal>
                <Button 
                    style={{marginTop:'12px'}} 
                    variant="contained" 
                    color="secondary" 
                    onClick={() => this.setState({openAddModal: true})}
                > Add </Button>
                <Grid container spacing={3} style={{padding: '20px 0'}}>
                    {this.state.collection.map(item => {
                        return (
                            <Grid item key={item.id} xs={12} md={3}>
                                <Card className={classes.card} raised>
                                    <CardHeader
                                        style={{textAlign: 'center', color: '#1a202c'}}
                                        title={item.key}
                                    />
                                    <CardContent>
                                        <Typography component="p" style={{ minHeight: '45px', overflow: 'scroll', textAlign: 'center', color: '#35425c'}}>
                                            {item.value}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </>
        )
    }


}
export default withStyles(styles)(Collection)