'use client';

import React from 'react';

const withCurrency = ({...props}) => WrappedText => 
    <WrappedText {...props}>
        {
            (props.data).toLocaleString('en-ZA', {
                style: 'currency',
                currency: 'ZAR'
            })
        }
    </WrappedText>;

export default withCurrency;