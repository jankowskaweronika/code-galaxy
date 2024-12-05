import React from 'react';
import { InputBase, Paper, SxProps, Theme } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

export type SearchBarProps = {
    onChange?: (value: string) => void;
    value?: string;
    className?: string;
    placeholder?: string;
    icon?: SvgIconComponent;
    sx?: SxProps<Theme>;
}

const SearchBar: React.FC<SearchBarProps> = ({
    onChange,
    value,
    placeholder = 'Search',
    sx
}) => {
    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                borderRadius: '50px',
                ...sx
            }}
            elevation={0}
            variant="outlined"
        >
            <SearchIcon
                sx={{
                    p: '10px',
                    color: 'action.active',
                    fontSize: 35
                }}
            />
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                fullWidth
            />
        </Paper>
    );
};

export default SearchBar;