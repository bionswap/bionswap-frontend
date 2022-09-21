import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, IconButton, OutlinedInput, styled, Typography } from "@mui/material"
import { BaseModal } from "components"
import { useCallback, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";


const CreateTokenModal = ({ open, onDismiss }: any) => {
    const Joi = require('joi');
    const [errors, setErrors] = useState([])
    const [dataCreated, setDataCreated] = useState({
        tokenType: '',
        name: '',
        symbol: '',
        decimal: '',
        totalSupply: '',
    })

    const handleDismiss = useCallback(() => {
        onDismiss?.();
    }, [onDismiss]);


    const schema = Joi.object({
        tokenType: Joi.string().required(),
        name: Joi.string().required(),
        symbol: Joi.string().required(),
        decimal: Joi.string().required(),
        totalSupply: Joi.string().required(),
    })

    const onCreateToken = async () => {
        try {
            const value = await schema.validateAsync({
                tokenType: dataCreated.tokenType,
                name: dataCreated.name,
                symbol: dataCreated.symbol,
                decimal: dataCreated.decimal,
                totalSupply: dataCreated.totalSupply,
            },
                { abortEarly: false });
            setErrors([])
        }
        catch (err: any) {
            setErrors(err?.details || [])
        }
    }

    const onShowError = (key: string) => {
        let message = ''
        errors?.map((item: any, index) => {
            if (item?.context?.key == key) {
                message = item?.message
            }
        })
        return message;
    }

    const handleChange = (prop: any) => (event: any) => {
        setDataCreated({ ...dataCreated, [prop]: event.target.value })
    }

    return (
        <BaseModal open={open} sx={{
            padding: '24px',
            maxWidth: '556px',
            width: '100%',
            height: '90vh',
            overflowY: 'auto',
        }}>
            <IconButton onClick={onDismiss} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <FlexBox flexDirection='column' gap='24px'>
                <Typography variant="h6Poppins" color="text.primary" fontWeight='500'>
                    Create token
                </Typography>
                <Typography variant="body4Poppins" color="red.500" fontWeight='500'>
                    (*) is required field.
                </Typography>
                <WrapForm fullWidth>
                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                        Token Type <RequireSymbol component='span'>*</RequireSymbol>
                    </Typography>
                    <InputCustom fullWidth
                        className={onShowError('tokenType') ? 'onError' : ''}
                        value={dataCreated.tokenType}
                        onChange={handleChange('tokenType')}
                        placeholder="Standard Token" />
                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                        {onShowError('tokenType')}
                    </Typography>
                    <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                        0.2 BNB
                    </Typography>
                </WrapForm>
                <WrapForm fullWidth>
                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                        Name <RequireSymbol component='span'>*</RequireSymbol>
                    </Typography>
                    <InputCustom fullWidth
                        className={onShowError('name') ? 'onError' : ''}
                        value={dataCreated.name}
                        onChange={handleChange('name')}
                        placeholder="Enter token name" />
                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                        {onShowError('name')}
                    </Typography>
                </WrapForm>
                <WrapForm fullWidth>
                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                        Symbol <RequireSymbol component='span'>*</RequireSymbol>
                    </Typography>
                    <InputCustom fullWidth
                        className={onShowError('symbol') ? 'onError' : ''}
                        value={dataCreated.symbol}
                        onChange={handleChange('symbol')}
                        placeholder="Enter token symbol" />
                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                        {onShowError('symbol')}
                    </Typography>
                </WrapForm>
                <WrapForm fullWidth>
                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                        Decimals <RequireSymbol component='span'>*</RequireSymbol>
                    </Typography>
                    <InputCustom fullWidth
                        className={onShowError('decimal') ? 'onError' : ''}
                        value={dataCreated.decimal}
                        onChange={handleChange('decimal')}
                        placeholder="Enter decimal" />
                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                        {onShowError('decimal')}
                    </Typography>
                </WrapForm>
                <WrapForm fullWidth>
                    <Typography component="label" variant="body4Poppins" color="blue.100" fontWeight="500">
                        Total supply <RequireSymbol component='span'>*</RequireSymbol>
                    </Typography>
                    <InputCustom fullWidth
                        className={onShowError('totalSupply') ? 'onError' : ''}
                        value={dataCreated.totalSupply}
                        onChange={handleChange('totalSupply')}
                        placeholder="Enter token supply" />
                    <Typography variant="captionPoppins" color="red.500" fontWeight="400">
                        {onShowError('totalSupply')}
                    </Typography>
                </WrapForm>
                <FormGroup>
                    <FormControlLabel control={<CheckboxCustom />} label={<Typography variant="body3Poppins" fontWeight='400'>Implement Bion Anti-Bot System?</Typography>} />
                </FormGroup>
                <CreateToken onClick={onCreateToken}>
                    <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                        Create Token
                    </Typography>
                </CreateToken>
            </FlexBox>
        </BaseModal>
    )
}

const FlexBox = styled(Box)`
    display: flex;
`
const WrapForm = styled(FormControl)`
    display: flex;
    flex-direction: column;
    gap: 6px;
`
const RequireSymbol = styled(Box)`
    color: ${(props) => props.theme.palette.red[500]};
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
const CheckboxCustom = styled(Checkbox)`
    color: ${(props) => props.theme.palette.gray[400]};
`
const CreateToken = styled(Button)`
    width: 100%;
    height: 52px;
    align-item: center;
    justify-content: center;
    display: flex;
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 4px;
`

export default CreateTokenModal