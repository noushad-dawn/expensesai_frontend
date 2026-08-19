import React, { useEffect } from 'react';
import { useApp } from '../store/store';
import SalaryCard from '../components/SalaryCard';

const Salary = () => {
  const { salaries, fetchSalaries, addSalary, updateSalary, deleteSalary } = useApp();

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h3 className="text-md font-bold text-brand-forest uppercase tracking-wider">Salary Logs</h3>
        <p className="text-xs text-brand-secondary mt-0.5 font-semibold">Configure your monthly income entries for financial analytics.</p>
      </div>

      <SalaryCard
        salaries={salaries}
        onAdd={addSalary}
        onUpdate={updateSalary}
        onDelete={deleteSalary}
      />
    </div>
  );
};

export default Salary;
