import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@material-ui/core";
 import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ placeholder, onSearch }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate(); // Declare navigate using the useNavigate hook

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
    if (navigate) {
      navigate(`/search?query=${query}`);
    }
  };

  return (
    <Box
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <TextField
        sx={{
          "& .MuiInputBase-root": {
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            flex: 1,
          },
        }}
        style={{
          width: isMobile ? "180px" : "",
        }}
        id="search-input"  
        label={placeholder || "Search"}
        value={query}
        inputProps={{ "aria-label": "Search" }}  
        onChange={(e) => setQuery(e.target.value)}
        InputLabelProps={{ htmlFor: "search-input" }} 
      />
      <Button
        variant="contained"
        style={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          height: isMobile ? "100%" : "100%",
          width: isMobile ? "80px" : "",
        }}
        color="primary"
        onClick={handleSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchInput;
