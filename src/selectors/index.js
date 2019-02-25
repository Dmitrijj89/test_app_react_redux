export function  searchEmployeesSelec(employees, searchString) {
	//console.log('searchEmployeesSelec', employees)
	
	return employees.filter((empl)=> {
         return empl.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1;
        })
} 

export function  filterEmployeesArchiveSelec(employees, filterIsArch) {
	//console.log('filterEmployeesArchiveSelec', employees)
   
    	switch(filterIsArch) {
    		case 'all': return employees;
    		case 'isArchive' : return employees.filter((empl)=>empl.isArchive);
    		case 'notIsArchive' : return employees.filter((empl)=>!empl.isArchive);
    		default: return employees;
    	}
    }

export function  filterEmployeesRoleSelec(employees, filterRole) {
    	switch(filterRole) {
    		case 'all': return employees;
    		case 'driver' : return employees.filter((empl) => empl.roles === filterRole);
    		case 'waiter' : return employees.filter((empl)=> empl.roles === filterRole);
    		case 'cook' : return employees.filter((empl)=> empl.roles === filterRole);
    		default: return employees;
    	}
    }

export function sortEmployeesSelector(employees, sort) {
      const empl = [...employees];
    switch(sort) {
        case 'all': return empl;
        case 'abc' : return empl.sort((a, b)=> {
                    const A = a.name.toUpperCase();
                    const B = b.name.toUpperCase();
                    return (A < B) ? -1 : (A > B) ? 1 : 0;
                });
        case 'cba' : return empl.sort((a, b)=> {
                    const A = a.name.toUpperCase();
                    const B = b.name.toUpperCase();
                    return (A > B) ? -1 : (A < B) ? 1 : 0;
                });
        case '123' : return empl.sort((a, b)=> {
                    const A = a.birthday;
                    const B = b.birthday;
                    return (A < B) ? -1 : (A > B) ? 1 : 0;
                });
        case '321' : return empl.sort((a, b)=> {
                    const A = a.birthday;
                    const B = b.birthday;
                    return (A > B) ? -1 : (A < B) ? 1 : 0;
                });
        default: return empl;
      }
    };

export function changeRole(role) {
      if (role === 'driver') return 'Водитель';
      else if (role ==='waiter') return 'Официант';
      else if (role === 'cook') return 'Повар';
      else {
        console.error('Ошибка в поле должность {role}');
      }
}