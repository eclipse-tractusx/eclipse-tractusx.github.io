/********************************************************************************* 
 * Copyright (c) 2023 BMW Group AG
 * Copyright (c) 2023 Mercedes Benz AG 
 * Copyright (c) 2023 Contributors to the Eclipse Foundation
 * 
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 * 
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 * 
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import React, { useState } from "react";
import Image1 from "@site/static/img/Eclipse_CommunityDay1.png";
import Image2 from "@site/static/img/Eclipse_CommunityDay2.png";
import styles from "./styles.module.css";
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

export default function RenderImage() {
    const [image, setImage] = useState(null)
    const [open, setOpen] = useState(false)
    const handleClose = () => setOpen(false)
    return (
        <div>
            <div onClick={() => {
                setImage(Image1)
                setOpen(true)
                }}>
                <img className={styles.img} src={Image1}/>
            </div>
            <div onClick={() => {
                setOpen(true)
                setImage(Image2)
            }}>
                <img className={styles.img} src={Image2}/>
            </div>
            {image && (
            <Dialog sx={{
                '.MuiDialog-paper': {
                    background: 'rgba(1,1,1,0.5)'
                }
            }} fullScreen onClose={handleClose} open={open}>
                <div className={styles.closeIcon}
                onClick={handleClose}
                >
                    <CloseIcon />
                </div>
                <img className={styles.fullwidthImage} src={image}/>
            </Dialog>
            )}
        </div>
    )
}