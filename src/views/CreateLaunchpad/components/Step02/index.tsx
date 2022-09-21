import React, { useState, useEffect } from "react";
import { Box, Typography, styled, FormControl, OutlinedInput, Button, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useToken } from "hooks/useToken";
import CreateTokenModal from "components/CreateTokenModal";
import { setPresaleForm } from "state/presale/action";

const currencies = [
    {
        value: 'busd',
        label: 'BUSD'
    },
    {
        value: 'usdt',
        label: 'USDT'
    },
    {
        value: 'usdc',
        label: 'USDC'
    },
    {
        value: 'bnb',
        label: 'BNB'
    },
]

const FeeOptions = [
    {
        value: 0,
        label: '5% BNB raised only'
    },
    {
        value: 1,
        label: '2%  BNB raised + 2% token sold'
    },
]

const Step02 = ({ data, setData, handleNext, handleBack, onShowError }: any) => {
    const tokenContract = useToken(data.tokenContract);
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (prop: any) => (event: any) => {
        // setData({ ...data, [prop]: event.target.value })
        setData(setPresaleForm({ ...data, [prop]: event.target.value }))
    }

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <FlexBox flexDirection='column' gap='46px' pt="40px" pb="40px">
                <FlexBox flexDirection='column' alignItems='center'>
                    <Typography variant="h3" color="text.primary" fontWeight="400">
                        2. Verify token
                    </Typography>
                    <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                        Enter the token address and verify
                    </Typography>
                </FlexBox>
                <FlexBox flexDirection="column">
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Token contract
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                You don’t have one? <Button onClick={handleOpenModal}>Create token now</Button>
                            </Typography>
                        </WrapDescription>
                        <WrapValue>
                            <WrapForm fullWidth>
                                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                    Contract <RequireSymbol component='span'>*</RequireSymbol>
                                </Typography>
                                <InputCustom fullWidth
                                    className={onShowError('tokenContract') ? 'onError' : ''}
                                    value={data.tokenContract}
                                    onChange={handleChange('tokenContract')}
                                    placeholder="Enter contract token" />
                                <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                                    {onShowError('tokenContract')}
                                </Typography>
                            </WrapForm>
                            <FlexBox flexDirection="column" gap="9px">
                                <ContractItem>
                                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                                        Name
                                    </Typography>
                                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                                        {tokenContract?.name}
                                    </Typography>
                                </ContractItem>
                                <Line />
                                <ContractItem>
                                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                                        Symbol
                                    </Typography>
                                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                                        {tokenContract?.symbol}
                                    </Typography>
                                </ContractItem>
                                <Line />
                                <ContractItem>
                                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                                        Decimal
                                    </Typography>
                                    <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                                        {tokenContract?.decimals}
                                    </Typography>
                                </ContractItem>
                            </FlexBox>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Which currency will you want to take
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                Users will pay with the currency they choose for your token
                            </Typography>
                        </WrapDescription>
                        <WrapValue>
                            <FormControl fullWidth>
                                <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                                    Currency <RequireSymbol component='span'>*</RequireSymbol>
                                </Typography>
                                <Select
                                    value={data.currency}
                                    onChange={handleChange('currency')}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}>
                                    {
                                        currencies?.map(item => (
                                            <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </WrapValue>
                    </WrapLine>
                    <WrapLine sx={{
                        borderBottom: '1px solid',
                        borderColor: 'gray.600',
                    }}>
                        <WrapDescription>
                            <Typography variant="body2Poppins" color="text.primary" fontWeight="400">
                                Sale fee option
                            </Typography>
                            <Typography variant="body4Poppins" className="content" color="#717D8A" fontWeight="400">
                                This is the fee that you are required to pay to veify your token.
                            </Typography>
                        </WrapDescription>
                        <WrapValue>
                            <FormControl fullWidth>
                                <RadioGroup
                                    value={data.saleFee}
                                    onChange={handleChange('saleFee')}
                                    name="radio-buttons-group"
                                >
                                    {
                                        FeeOptions?.map(item => (
                                            <FormControlLabel key={item.value} value={item.value} label={
                                                <Typography variant="body4Poppins" color={data.saleFee == item.value ? 'blue.100' : 'gray.700'} fontWeight="400">
                                                    {item.label}
                                                </Typography>
                                            }
                                                control={
                                                    <Radio sx={{
                                                        color: 'gray.700',
                                                        '&.Mui-checked': {
                                                            color: 'blue.500',
                                                        },
                                                    }} />
                                                } />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </WrapValue>
                    </WrapLine>
                </FlexBox>
                <FlexBox justifyContent='flex-end' gap='14px'>
                    <Back onClick={() => handleBack(2)}>
                        <Typography variant="body3Poppins" color="primary.main" fontWeight="600">
                            Back
                        </Typography>
                    </Back>
                    <Next onClick={() => handleNext(2)}>
                        <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                            Next
                        </Typography>
                    </Next>
                </FlexBox>
            </FlexBox>
            <CreateTokenModal open={openModal} onDismiss={handleCloseModal} />
        </>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapLine = styled(Box)`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 30px 0;
    border-top: 1px solid;
    border-color: ${(props) => props.theme.palette.gray[600]};
`
const WrapDescription = styled(Box)`
    display: flex;
    flex-direction: column;
    max-width: 328px;
    width: 100%;
`
const WrapValue = styled(Box)`
    max-width: 617px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`
const Next = styled(Button)`
    max-width: 200px;
    width: 100%;
    height: 45px;
    align-item: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
`
const Back = styled(Button)`
    max-width: 200px;
    width: 100%;
    height: 45px;
    align-item: center;
    justify-content: center;
    display: flex;
    background-color: rgba(7, 224, 224, 0.15);;
    border-radius: 4px;
`
const ContractItem = styled(Box)`
    display: flex;
    justify-content: space-between;
`
const Line = styled(Box)`
    background-color: ${(props) => props.theme.palette.gray[800]};
    height: 1px;
    widht: 100%;
`
const WrapForm = styled(FormControl)`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
const InputCustom = styled(OutlinedInput)`
    fieldset {
        display: none
    }

    input {
        font-family: 'Poppins', sans-serif;
        padding: 12px 16px;
        border: 1px solid;
        border-color: ${(props) => props.theme.palette.gray[700]};
        border-radius: 4px;
        font-weight: 400;
        font-size: 14px;
        line-height: 180%;
        color: ${(props) => props.theme.palette.text.primary};

        &::placeholder {
            font-family: 'Poppins', sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 180%;
            color: ${(props) => props.theme.palette.gray[700]};
            opacity: 1;
        }
    }

    &.Mui-focused {
        input {
            border-color: #9A6AFF;
            box-shadow: rgba(175, 137, 255, 0.4) 0px 0px 0px 2px, rgba(175, 137, 255, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
        }
    }

    &.onError {
        input {
            border-color: ${(props) => props.theme.palette.red[500]};
            box-shadow: none;
        }
    }
`
const RequireSymbol = styled(Box)`
    color: ${(props) => props.theme.palette.red[500]};
`

export default Step02 