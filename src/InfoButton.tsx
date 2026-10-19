import { useState } from 'react';
import './InfoButton.css';

const InfoButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="info">
            <button
                className="info-toggle"
                aria-label="Controls"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
            >
                i
            </button>

            {open && (
                <div className="info-panel" role="dialog" aria-label="Controls help">
                    <h2>Controls</h2>
                    <ul>
                        <li>
                            <b>Click a shelf</b> to cycle its state (how full it is).
                        </li>
                        <li>
                            <b>W A S D</b> to move around the warehouse map.
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default InfoButton;
