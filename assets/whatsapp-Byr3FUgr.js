var e=e=>{let t=e.name||e.patientName||``,n=e.date||e.preferredDate||``,r=`*طلب حجز جديد – مركز مودة لجراحات العيون*

👤 الاسم: ${t}
📞 الهاتف: ${e.phone}
🏥 الخدمة: ${e.service}
📅 التاريخ: ${n||`غير محدد`}
📝 الملاحظات: ${e.notes||`لا يوجد`}

شكراً جزيلاً.`,i=`https://api.whatsapp.com/send?phone=201000141542&text=${encodeURIComponent(r)}`;window.open(i,`_blank`)},t=e=>{let t=e.name||e.patientName||``,n=e.date||e.preferredDate||``,r=`طلب حجز جديد في مركز مودة لجراحات العيون\n\nالاسم: ${t}\nرقم الهاتف: ${e.phone}\nالخدمة: ${e.service}\nالتاريخ: ${n}\nالملاحظات: ${e.notes||`لا توجد ملاحظات إضافية`}\n\nشكراً جزيلاً.`;return`https://api.whatsapp.com/send?phone=201000141542&text=${encodeURIComponent(r)}`};export{e as n,t};