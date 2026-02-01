import { useLocation, useNavigate } from 'react-router-dom';
import { EXECUTION_PLANS } from '../../data/executionPlans';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function ROIExecutionPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Get data from navigation state
    const { solutionId, invest, save, roi } = location.state || {};

    // If no data, redirect back
    if (!solutionId || !EXECUTION_PLANS[solutionId]) {
        navigate('/');
        return null;
    }

    const plan = EXECUTION_PLANS[solutionId];
    const currSymbol = '₹';

    // Calculate timeline data with actual numbers
    const timelineWithData = plan.timeline.map(item => ({
        ...item,
        savings: item.savings === 'Monthly Savings' ? save : (item.savings === 'Partial Savings' ? save * 0.5 : item.savings),
        cumulative:
            item.cumulative === 'Monthly Savings' ? save :
                item.cumulative === '1.5x Monthly Savings' ? save * 1.5 :
                    item.cumulative === '2x Monthly Savings' ? save * 2 :
                        item.cumulative === '50% Monthly Savings' ? save * 0.5 :
                            item.cumulative === 'Partial Savings' ? save * 0.5 :
                                item.cumulative
    }));

    // Export to PDF function
    const exportToPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header
        doc.setFontSize(22);
        doc.setFont(undefined, 'bold');
        doc.text('ROI Execution Plan', pageWidth / 2, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.setTextColor(100);
        doc.text(plan.name, pageWidth / 2, 28, { align: 'center' });

        // Reset color
        doc.setTextColor(0);

        let yPos = 40;

        // Executive Snapshot
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Executive Snapshot', 14, yPos);
        yPos += 8;

        doc.setFontSize(10);
        doc.setFont(undefined, 'normal');
        doc.text(`Investment: ${currSymbol}${invest.toLocaleString()}`, 14, yPos);
        yPos += 6;
        doc.text(`Monthly Savings: ${currSymbol}${save.toLocaleString()}`, 14, yPos);
        yPos += 6;
        doc.text(`ROI Timeline: ${roi === 'Immediate' ? 'Immediate' : roi + ' months'}`, 14, yPos);
        yPos += 6;
        doc.text(`Summary: ${plan.summary}`, 14, yPos, { maxWidth: pageWidth - 28 });
        yPos += 12;

        // Execution Steps
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('How This ROI Is Achieved', 14, yPos);
        yPos += 8;

        plan.executionSteps.forEach((step, idx) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(11);
            doc.setFont(undefined, 'bold');
            doc.text(`Step ${step.step}: ${step.title}`, 14, yPos);
            yPos += 6;

            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text(step.description, 14, yPos, { maxWidth: pageWidth - 28 });
            yPos += 5;
            doc.text(`Timeline: ${step.timeline}  |  Cost: ${step.cost}`, 14, yPos);
            yPos += 5;
            doc.setTextColor(100);
            doc.text(`Outcome: ${step.outcome}`, 14, yPos, { maxWidth: pageWidth - 28 });
            doc.setTextColor(0);
            yPos += 8;
        });

        // Timeline & Cash Recovery
        if (yPos > 200) {
            doc.addPage();
            yPos = 20;
        }

        yPos += 5;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Timeline & Cash Recovery', 14, yPos);
        yPos += 8;

        const timelineTableData = timelineWithData.map(item => [
            item.month,
            item.activity,
            typeof item.savings === 'number' ? `${currSymbol}${Math.round(item.savings).toLocaleString()}` : item.savings,
            typeof item.cumulative === 'number' ? `${currSymbol}${Math.round(item.cumulative).toLocaleString()}` : item.cumulative
        ]);

        doc.autoTable({
            startY: yPos,
            head: [['Period', 'Activity', 'Monthly Savings', 'Cumulative']],
            body: timelineTableData,
            theme: 'grid',
            headStyles: { fillColor: [46, 213, 115], textColor: 255 },
            styles: { fontSize: 9 },
        });

        yPos = doc.lastAutoTable.finalY + 12;

        // Add new page if needed
        if (yPos > 240) {
            doc.addPage();
            yPos = 20;
        }

        // Assumptions
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Assumptions & Constraints', 14, yPos);
        yPos += 8;

        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        plan.assumptions.forEach((assumption, idx) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`• ${assumption}`, 14, yPos, { maxWidth: pageWidth - 28 });
            yPos += 5;
        });

        yPos += 6;
        doc.setFont(undefined, 'bold');
        doc.text('Accelerators:', 14, yPos);
        yPos += 5;
        doc.setFont(undefined, 'normal');
        plan.accelerators.forEach(acc => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(`• ${acc}`, 14, yPos, { maxWidth: pageWidth - 28 });
            yPos += 5;
        });

        // Risks & Mitigation
        if (yPos > 220) {
            doc.addPage();
            yPos = 20;
        }

        yPos += 8;
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.text('Risk & Mitigation', 14, yPos);
        yPos += 8;

        plan.risks.forEach((risk, idx) => {
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }

            doc.setFontSize(10);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(220, 38, 38);
            doc.text(`Risk ${idx + 1}: ${risk.risk}`, 14, yPos);
            doc.setTextColor(0);
            yPos += 6;

            doc.setFontSize(9);
            doc.setFont(undefined, 'normal');
            doc.text(`Impact: ${risk.impact}`, 14, yPos);
            yPos += 5;
            doc.setTextColor(34, 197, 94);
            doc.text(`Mitigation: ${risk.mitigation}`, 14, yPos, { maxWidth: pageWidth - 28 });
            doc.setTextColor(0);
            yPos += 8;
        });

        // Save PDF
        doc.save(`ROI-Execution-Plan-${plan.name.replace(/\s+/g, '-')}.pdf`);
    };

    return (
        <div className="roi-execution-page min-h-screen" style={{ background: 'var(--color-bg-alt)' }}>
            {/* Header with navigation */}
            <div className="sticky top-0 z-50 border-b" style={{
                background: 'var(--color-bg-panel)',
                borderColor: 'var(--color-border)'
            }}>
                <div className="container max-w-[1000px] w-[90%] mx-auto py-4 flex justify-between items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:bg-[var(--color-bg-input)]"
                        style={{ color: 'var(--color-text-main)' }}
                    >
                        <i className="ri-arrow-left-line" />
                        <span>Back to Roadmap</span>
                    </button>

                    <button
                        onClick={exportToPDF}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold transition-all"
                        style={{
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            color: '#ffffff',
                        }}
                    >
                        <i className="ri-download-line" />
                        <span>Export PDF</span>
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="container max-w-[1000px] w-[90%] mx-auto py-12">

                {/* Executive Snapshot */}
                <section className="executive-snapshot mb-12 p-8 rounded-2xl border-2" style={{
                    background: 'var(--color-bg-panel)',
                    borderColor: 'var(--color-primary)',
                }}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 grid place-items-center rounded-xl text-3xl" style={{
                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                            color: '#ffffff',
                        }}>
                            <i className={plan.icon} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black mb-1" style={{ color: 'var(--color-text-main)' }}>
                                {plan.name}
                            </h1>
                            <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
                                ROI Execution Plan
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-6 mb-6">
                        <div className="text-center p-4 rounded-lg" style={{ background: 'var(--color-bg-input)' }}>
                            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                Investment
                            </div>
                            <div className="text-2xl font-black" style={{
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                {currSymbol}{invest.toLocaleString()}
                            </div>
                        </div>

                        <div className="text-center p-4 rounded-lg" style={{ background: 'var(--color-bg-input)' }}>
                            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                Monthly Savings
                            </div>
                            <div className="text-2xl font-black" style={{
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                {currSymbol}{save.toLocaleString()}
                            </div>
                        </div>

                        <div className="text-center p-4 rounded-lg" style={{ background: 'var(--color-bg-input)' }}>
                            <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                                ROI Timeline
                            </div>
                            <div className="text-2xl font-black" style={{
                                background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                {roi === 'Immediate' ? 'Immediate' : `${roi} Mo`}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg" style={{ background: 'rgba(46, 213, 115, 0.1)', border: '1px solid var(--color-primary)' }}>
                        <div className="flex items-start gap-3">
                            <i className="ri-lightbulb-flash-line text-xl" style={{ color: 'var(--color-primary)' }} />
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-main)' }}>
                                <strong>Why This ROI Is Achievable:</strong> {plan.summary}
                            </p>
                        </div>
                    </div>
                </section>

                {/* How This ROI Is Achieved */}
                <section className="execution-steps mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-main)' }}>
                        <i className="ri-roadmap-line" style={{ color: 'var(--color-primary)' }} />
                        How This ROI Is Achieved
                    </h2>

                    <div className="space-y-6">
                        {plan.executionSteps.map((step, idx) => (
                            <div key={idx} className="step-card p-6 rounded-xl border-l-4 transition-all hover:shadow-lg" style={{
                                background: 'var(--color-bg-panel)',
                                borderColor: 'var(--color-primary)',
                                borderLeftColor: 'var(--color-primary)',
                            }}>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full grid place-items-center font-bold flex-shrink-0" style={{
                                        background: 'var(--color-primary)',
                                        color: '#ffffff',
                                    }}>
                                        {step.step}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--color-text-main)' }}>
                                            {step.title}
                                        </h3>
                                        <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                                            {step.description}
                                        </p>

                                        <div className="grid grid-cols-3 gap-4 text-xs">
                                            <div>
                                                <span className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Timeline:</span>{' '}
                                                <span className="font-bold" style={{ color: 'var(--color-text-main)' }}>{step.timeline}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Cost:</span>{' '}
                                                <span className="font-bold" style={{ color: 'var(--color-text-main)' }}>{step.cost}</span>
                                            </div>
                                            <div className="col-span-1">
                                                <span className="font-semibold" style={{ color: 'var(--color-text-muted)' }}>Outcome:</span>{' '}
                                                <span style={{ color: 'var(--color-primary)' }}>{step.outcome}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Timeline & Cash Recovery */}
                <section className="timeline-section mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-main)' }}>
                        <i className="ri-calendar-check-line" style={{ color: 'var(--color-accent)' }} />
                        Timeline & Cash Recovery
                    </h2>

                    <div className="overflow-x-auto rounded-xl border" style={{ background: 'var(--color-bg-panel)', borderColor: 'var(--color-border)' }}>
                        <table className="w-full">
                            <thead>
                                <tr style={{ background: 'var(--color-primary)', color: '#ffffff' }}>
                                    <th className="px-4 py-3 text-left text-sm font-bold">Period</th>
                                    <th className="px-4 py-3 text-left text-sm font-bold">Activity</th>
                                    <th className="px-4 py-3 text-right text-sm font-bold">Monthly Savings</th>
                                    <th className="px-4 py-3 text-right text-sm font-bold">Cumulative</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timelineWithData.map((item, idx) => (
                                    <tr key={idx} className="border-t transition-colors hover:bg-[var(--color-bg-input)]" style={{ borderColor: 'var(--color-border)' }}>
                                        <td className="px-4 py-3 font-semibold" style={{ color: 'var(--color-text-main)' }}>{item.month}</td>
                                        <td className="px-4 py-3" style={{ color: 'var(--color-text-muted)' }}>{item.activity}</td>
                                        <td className="px-4 py-3 text-right font-bold" style={{ color: 'var(--color-primary)' }}>
                                            {typeof item.savings === 'number' ? `${currSymbol}${Math.round(item.savings).toLocaleString()}` : item.savings}
                                        </td>
                                        <td className="px-4 py-3 text-right font-black" style={{ color: 'var(--color-accent)' }}>
                                            {typeof item.cumulative === 'number' ? `${currSymbol}${Math.round(item.cumulative).toLocaleString()}` : item.cumulative}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Assumptions & Constraints */}
                <section className="assumptions-section mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-main)' }}>
                        <i className="ri-file-list-3-line" style={{ color: 'var(--color-accent)' }} />
                        Assumptions & Constraints
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Key Assumptions
                            </h3>
                            <ul className="space-y-2">
                                {plan.assumptions.map((assumption, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-main)' }}>
                                        <i className="ri-check-line text-lg flex-shrink-0" style={{ color: 'var(--color-primary)' }} />
                                        <span>{assumption}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl" style={{ background: 'var(--color-bg-panel)', border: '1px solid var(--color-border)' }}>
                            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'var(--color-text-muted)' }}>
                                Accelerators
                            </h3>
                            <ul className="space-y-2">
                                {plan.accelerators.map((acc, idx) => (
                                    <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--color-text-main)' }}>
                                        <i className="ri-arrow-right-up-line text-lg flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                                        <span>{acc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Risk & Mitigation */}
                <section className="risk-section">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text-main)' }}>
                        <i className="ri-shield-check-line" style={{ color: '#fc5c65' }} />
                        Risk & Mitigation
                    </h2>

                    <div className="space-y-4">
                        {plan.risks.map((risk, idx) => (
                            <div key={idx} className="risk-card p-6 rounded-xl" style={{
                                background: 'var(--color-bg-panel)',
                                border: '1px solid var(--color-border)',
                            }}>
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full grid place-items-center flex-shrink-0" style={{
                                        background: 'rgba(252, 92, 101, 0.1)',
                                        color: '#fc5c65',
                                    }}>
                                        <i className="ri-alert-line" />
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-base font-bold mb-2" style={{ color: '#fc5c65' }}>
                                            {risk.risk}
                                        </h3>
                                        <p className="text-sm mb-3" style={{ color: 'var(--color-text-muted)' }}>
                                            <strong>Impact:</strong> {risk.impact}
                                        </p>
                                        <div className="p-3 rounded-lg" style={{ background: 'rgba(46, 213, 115, 0.1)' }}>
                                            <p className="text-sm" style={{ color: 'var(--color-text-main)' }}>
                                                <strong style={{ color: 'var(--color-primary)' }}>Mitigation:</strong> {risk.mitigation}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
