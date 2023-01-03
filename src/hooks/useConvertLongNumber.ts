import React , {useState} from 'react'

const convertLongNumber = (value:number) => {
    let result = '';
    if (value >= 1000) {
        let suffixes = ["", "k", "m", "b","t"];
        let suffixNum = Math.floor( (""+value).length/3 );
        let shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision)).toString();
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (Number(shortValue) % 1 != 0)  shortValue = Number(shortValue).toFixed(1);
        result = shortValue + suffixes[suffixNum];
    }
    return result;
}

export default convertLongNumber;