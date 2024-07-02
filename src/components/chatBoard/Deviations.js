import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Deviations = () => {
    return (
        <div style={{marginLeft:'50px', marginRight:'50px'}}>
            <Accordion sx={{
                marginTop: '15px',
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Specific Amount Missing
                </AccordionSummary>
                <AccordionDetails>
                The contract text lacks the specific amount for the initial franchise fee. It only mentions "$1000" but doesn't provide the currency.

                </AccordionDetails>
            </Accordion>

            <Accordion sx={{
                marginTop: '15px',
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Currency Discrepancy
                </AccordionSummary>
                <AccordionDetails>
                While the template text uses a placeholder for the amount, it's assumed to be in a standard currency (likely USD).  The contract text uses "rupees," which creates inconsistency
                </AccordionDetails>
            </Accordion>

            <Accordion sx={{
                marginTop: '15px',
            }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Missing Detail
                </AccordionSummary>
                <AccordionDetails>
                The contract text lacks the detail about what type of franchise the Franchisee is purchasing (e.g., "one _________________ franchise").
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default Deviations