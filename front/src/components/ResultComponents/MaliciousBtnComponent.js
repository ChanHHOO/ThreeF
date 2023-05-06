import React, { Component } from 'react';
import styled from 'styled-components';
import {s3, getCsvParams} from '../../db';

const MaliciousBtnComponent = ({ props }) => {
	const onClickDownloadBtn = async () => {
		const fileName = props.requestId ? props.requestId : 'awesome';
		const param = await getCsvParams('awesome');

		const data = await s3.getObject(param).promise();
		const content = data.Body.toString();

		const file = new Blob([content], {type: 'text/csv'});
		const url = URL.createObjectURL(file);

		const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
	}

	return (
		<MaliciousItemRoot>
			<ResultBtn onClick={()=>onClickDownloadBtn()}>Download Results</ResultBtn>
		</MaliciousItemRoot>
	);
}

const MaliciousItemRoot = styled.div`
	font-family: AkiraExpanded;
	display:flex;
	margin-left:1em;
`
const ResultBtn = styled.button`
	font-size: 1em;
	font-family: AkiraExpanded;
	padding: 5% 2% 5% 2%;
	background: red;
	border-radius: 1em;
	border: none;
    color: white;
	&:hover{
		box-shadow: -0.3em -0.3em 0.5em rgba(255,255,255,0.45), 5px 5px 9px rgba(94,104,121,0.3);
	}
	&:active{
		box-shadow: inset -0.3em -0.3em 0.5em rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3);
	}
`

export default MaliciousBtnComponent;

