import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ label, id, type = 'text', ...props }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', width: '100%' }}>
            {label && <label htmlFor={id} style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{label}</label>}
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
