
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import '../styles/taskView.css';

export function TestDialog(props) {



    return (
        <div>
            <Dialog open={true} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div>{props.num}</div>
                    <Button variant="contained" onClick={props.f} >Leave comment</Button>

                </DialogContent>
            </Dialog>
        </div>
    );
}