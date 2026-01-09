import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, id, type = 'text', ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
            {label && <label htmlFor={id} style={{ color: '#020202ff', fontSize: '0.9rem', fontWeight: 500 }}>{label}</label>}
            <input
                id={id}
                type={type}
                className="input-field"
                {...props}
            />
        </div>
    );
};

Input.propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
};

export default Input;
