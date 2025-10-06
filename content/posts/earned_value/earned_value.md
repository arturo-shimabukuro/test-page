---
title: "Earn Value Project"

draft: false
tags: ["Excel", "Power BI"]

---



# Earn Value

## 1. Project Overview

### 1.1 Scope

Present the progress in the different projects evaluating the time and cost management for each of them in different parts of Peru.  This would be based on the earned value metrics from the Project Management Body of Knowledge (PMBoK) from Project Management Institute (PMI).

### 1.2 Goals

- Show the earned value of the projects financially and from a scheduling perspective
- Present general data from the companies involved, project supervisor for each  the project selected and last comments added to the project
- Visualize in a map where does the projects are being worked on

### 1.3 Limitations

The version of Excel is not the 365 version but the 2013 version. There is no premium license for Power BI so only the Desktop application was used. 


### 1.4 Consideration

Initially this project was going to be worked without using Power BI and Excel's additional features as Power Query but while developing the project they were allowed in the scope of the project. This impacted in some sections of the project, as some of the functions could have been done with Power Query or DAX from Power BI but are pre-processed in Excel so the the progress that was done before was not lost. 


### 1.5 Points of improvement

As mentioned in the consideration section all the data management and work could have been done in Power Query or DAX from Power BI directly. Similarly some of the newest formula from later version of Excel could been more useful. Also one of the primary tables for the Power BI visualization can be merge with another one for optimization of the tables.


### 1.6 Tools used
- Excel
- Power BI

## 2. Structuring Data 

### 2.1 Structuring Data in Excel

The most important fields that wanted to be added was talked and then worked on a Excel columns for data inputs.

A first table should present the initial planning with the milestones and a second table with the progress updated data of the project. Both tables will have the same fields but will be in different sheets to help the user have separated tables for milestones initial planned values and the progress of the project.  

The tables will have the following fields: 

| Column Name (Translation)                  | Original column name             | Description                        | Data type |
| ------------------------------------------ | -------------------------------- | ---------------------------------- | --------- |
| Date                                       | Fecha                            | Date of the update                 | Date      |
| Project                                    | Proyecto                         | Name of the Project                | String    |
| Project Type                               | Tipo de Proyecto                 | Type of project / Project category | String    |
| Executing Company                          | Empresa Ejecutora                |                                    | String    |
| Supervisor Name                            | Nombre del supervisor            |                                    | String    |
| % Physical Progress of the Project         | % Avance Físico de Obra          |                                    | Float     |
| % Financial Progress of the Project        | % Avance Financiero de Obra      |                                    | Float     |
| Contracted (Budget) Amount for the Project | Monto Contratado Obra            |                                    | Integer   |
| Amount paid for the project                | Monto Pagado / Ejecutado de Obra |                                    | Interger  |
| Balance                                    | Saldo                            |                                    | Interger  |
| Amount contracted for supervision          | Monto Contratado de supervisión  |                                    | Integer   |
| Amount paid to supervisor                  | Monto ejecución de supervisión   |                                    | Integer   |
| Supervisor payment balance                 | Saldo de Supervisión             |                                    | Integer   |
| Start Date                                 | Fecha Inicio                     |                                    | Date      |
| Scheduled End Date                         | Fecha Fin Programada             |                                    | Date      |
| End Date                                   | Fecha Fin                        |                                    | Date      |
| Comments                                   | Comentario / Observaciones       |                                    | String    |

In the end a table with the projects location was created for the Power BI visualization. 

| Column Name (Translation) | Original column name | Description | Data type |
| ------------------------- | -------------------- | ----------- | --------- |
| Project                   | Proyecto             |             | String    |
| Province                  | Provincia            |             | String    |
| Department                | Departamento         |             | String    |

The next step is to transform this data to have what the expected progress based on what the milestones were added, so it can be compared.  

### 2.2 Transforming Data in Excel


The transformation part was aimed for calculating the planned value at the point of the updated data considering a linear progress. Basically a linear interpolation formula was needed. 

This is calculated for the columns:


| Column Name                                | Original Column Name                                 |
| ------------------------------------------ | -------------------------------- |
| % Physical Progress of the Project         | % Avance Físico de Obra          |
| % Financial Progress of the Project        | % Avance Financiero de Obra      |
| Contracted (Budget) Amount for the Project | Monto Contratado Obra            |
| Amount paid for the project                | Monto Pagado / Ejecutado de Obra |
| Balance                                    | Saldo                            |
| Amount contracted for supervision          | Monto Contratado de supervisión  |
| Amount paid to supervisor                  | Monto ejecución de supervisión   |
| Supervisor payment balance                 | Saldo de Supervisión             |

To use the calculations first the data needs to be sorted correctly by Project Name and Dates column from the milestones table. For this Power Query was used to ensure that the information was sorted correctly.  

As for the table calculations the following was used in Excel after Power Query was used:

As an example this is the Physical Progress of the Project: 
``` text

=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));1;+(INDEX(FILTER(VG_HItos_Sorted_1[% Avance Físico de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[% Avance Físico de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[% Avance Físico de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

For readability I changed this code with indentation, take into consideration that **using this code with this format would not work as Excel does not support indentation**:

``` text
=IF(
	A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));
	1;
	+(INDEX(
		FILTER(
			VG_HItos_Sorted_1[% Avance Físico de Obra];
			VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2
		);
		MATCH(
			A2;
			FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2)
			;
			1
		)+1
	)
	-INDEX(
		FILTER(
			VG_HItos_Sorted_1[% Avance Físico de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
			MATCH(
				A2;
				FILTER(
					VG_HItos_Sorted_1[Fecha];
					VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2
				);
			1
			)
		)
	)
	/DAYS(
		INDEX(
			FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
			MATCH(
				A2;
				FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
				1
			)+1);
			INDEX(
				FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
				MATCH(
					A2;
					FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
					1
				)
			)
	)
	*DAYS(
		A2;
		INDEX(
			FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
			MATCH(
				A2;
				FILTER(VG_HItos_Sorted_1[Fecha];
				VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
				1
			)
		)
	)
	+INDEX(
		FILTER(VG_HItos_Sorted_1[% Avance Físico de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
		MATCH(
			A2;
			FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);
			1
		)
	)
)
```


Here are the other columns formulas which have the same structure from the % Physical Progress of the Project column: 


- **% Financial Progress of the Project**

``` text

=+IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));1;+(INDEX(FILTER(VG_HItos_Sorted_1[% Avance Financiero de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[% Avance Financiero de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[% Avance Financiero de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

- **Contracted (Budget) Amount for the Project**

``` text

=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));MAX(FILTER(VG_HItos_Sorted_1[Monto Contratado Obra];VG_HItos_Sorted_1[Proyecto]=B2));+(INDEX(FILTER(VG_HItos_Sorted_1[Monto Contratado Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[Monto Contratado Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[Monto Contratado Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

- **Amount paid for the project**

``` text

=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));MAX(FILTER(VG_HItos_Sorted_1[Monto Pagado / Ejecutado de Obra];VG_HItos_Sorted_1[Proyecto]=B2));+(INDEX(FILTER(VG_HItos_Sorted_1[Monto Pagado / Ejecutado de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[Monto Pagado / Ejecutado de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[Monto Pagado / Ejecutado de Obra];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

- **Balance**
``` text

=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));MIN(FILTER(VG_HItos_Sorted_1[Saldo];VG_HItos_Sorted_1[Proyecto]=B2));+(INDEX(FILTER(VG_HItos_Sorted_1[Saldo];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[Saldo];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[Saldo];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

- **Amount contracted for supervision**

``` text

=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));MAX(FILTER(VG_HItos_Sorted_1[Monto Contratado supervisión];VG_HItos_Sorted_1[Proyecto]=B2));+(INDEX(FILTER(VG_HItos_Sorted_1[Monto Contratado supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[Monto Contratado supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[Monto Contratado supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```


- **Amount paid to supervisor**

``` text

=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));MAX(FILTER(VG_HItos_Sorted_1[Monto ejecución de supervisión];VG_HItos_Sorted_1[Proyecto]=B2));+(INDEX(FILTER(VG_HItos_Sorted_1[Monto ejecución de supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[Monto ejecución de supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[Monto ejecución de supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

- **Supervisor payment balance**

``` text 
=IF(A2>=MAX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2));MIN(FILTER(VG_HItos_Sorted_1[Saldo Supervisión];VG_HItos_Sorted_1[Proyecto]=B2));+(INDEX(FILTER(VG_HItos_Sorted_1[Saldo Supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1)-INDEX(FILTER(VG_HItos_Sorted_1[Saldo Supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))/DAYS(INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)+1);INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))*DAYS(A2;INDEX(FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))+INDEX(FILTER(VG_HItos_Sorted_1[Saldo Supervisión];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);MATCH(A2;FILTER(VG_HItos_Sorted_1[Fecha];VG_HItos_Sorted_1[Proyecto]=VG_Programado!B2);1)))
```

### 2.3 Connecting the tables in Power BI

![](/images/earned_value/Earned_Value_Database_connection_scheme_Power%20BI.png)


The primary tables in this case are  'Calendar', 'Projects' and ''Project Location', where the general and unique data is added. The primary Key for "Projects" and "Project Location" were the field "Project". Here as a point of improvement of the project, the information of the two tables described before could have been stored all in one table instead. As for the calendar it standardize the dates from all tables. 

The connections of the tables are as follows: 

![](/images/earned_value/Earned_Value_Database_connection_keys_links_Power_BI.png)

## 3. Dashboard

This is the final project visual. 

![](/images/earned_value/Earned_Value_Dashboard.png)

We can observe that in the top there are 3 slicers and when the last date of update for a specific project. 

### 3.1 Slicers

The slicers correspond to:
- Department
- Project Type
- Financial or Execution

The Financial or Execution is for analyzing the S-Curve for the physical project progress and the financial progress. 

### 3.2 Visualizations

In the visualization the following fields can be seen:

- District
- S-Curve
- Project Progress
- Project Table
- General Information
- Comments

#### 3.2.1 District Visual

![](/images/earned_value/Earned_Value_Dashboard_District.png)

The District visualization shows all the districts from each Department from the country. This was used with a custom file that was found. Here is the link for reference: 
#### 3.2.2 S- Curve Visual

![](/images/earned_value/Earned_Value_Dashboard_S_Curve.png)

For the S-Curve line graph,  measures were used to show the data. If no project is selected, no graph will show as it would not be consistent information being shown. The information will also depend on the slicer 'Financial or Execution' were the project progress and the financial progress will be shown depending on the filter. In this case it has been set up for it to only select 1 of the options. 

For detail for the graphs, the X-axis is composed by the Dates column. For the Y-axis it is composed by 2 measures the Programmed (Planned Values) and the Execution. This values were worked with measures so the it can be changed from the physical progress or the financial progress of the project. 

A consideration for this part is that the slicer of 'Financial or Execution' is a disconnected table from the model that help to filter the information based on the measures.

Here are the respective measures: 

- **Planed Values**

``` DAX

Programado Finan o Ejec = 
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE,
	    Var _SelectedSlicer = SELECTEDVALUE(Finan_Ejec[Financiero o Ejecutado])  
	    Return
		    IF(
			    _SelectedSlicer = "Ejecutado", 
			    SUM(VG_Programado1[% Avance Físico de Obra]),
			    SUM(VG_Programado1[% Avance Financiero de Obra])),

	BLANK())
```

- **Real Project Progress**
``` DAX

Programado Finan o Ejec = 
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE,
	    Var _SelectedSlicer = SELECTEDVALUE(Finan_Ejec[Financiero o Ejecutado])  
	Return
		IF(
			_SelectedSlicer = "Ejecutado", 
			SUM(VG_Programado1[% Avance Físico de Obra]), 
			SUM(VG_Programado1[% Avance Financiero de Obra])),
	BLANK())
```


#### Functions 

#### 3.3.3 Physical Progress Gauge

![](/images/earned_value/Earned_Value_Dashboard_Physical_Gauge.png)

For this visualization, it was only two measures that used the last data from the updated physical progress status and the calculated value (in Excel) of planned progress. Here the goal is the planned value versus the real progress. 

For this case, the same consideration as the S-Curve

**Last Planed Values**
``` DAX

Avance Programado Ultimo =
	IF(
	    ISFILTERED(Proyectos[Proyecto])=TRUE(),
	    CALCULATE(
	        SUM(VG_Programado1[% Avance Físico de Obra]),
	        LASTDATE(VG_Programado1[Fecha])
	    ),
	    BLANK()
	
	)
```


**Last Real Project Progress**
``` DAX

Avance Físico Ultimo =
    IF(
        ISFILTERED(Proyectos[Proyecto])=TRUE(),
        CALCULATE(
            SUM(VG_Real[% Avance Físico de Obra]),
            LASTDATE(VG_Real[Fecha])
        ),
        0
    )
```


#### 3.3.4 Project Table

![](/images/earned_value/Earned_Value_Dashboard_Projects_Table.png)

For the table it show all the projects initially with the projects Key Performance Index (KPI) to have an overview of the project progress. The fields for the table are:

- Project Name
- % Physical Progress
- % Financial Progress
- SPI (Schedule Performance Index)
- CPI (Cost Performance Index)

In this case the all the fields were calculated with DAX except the Project name. The % Physical Progress and % Financial Progress are similar as the measure done in the gauge but with the only difference that there is no need to show them blank if no specific project is selected. 

The measures are as follows:

**% Physical Progress**

``` DAX

Avance Físico-Ultimo Tabla =
    CALCULATE(
            SUM(VG_Real[% Avance Físico de Obra]),
            LASTDATE(VG_Real[Fecha])
        )
```

**% Financial Progress**

``` DAX
Avance Financiero-Último = 
	CALCULATE(
		SUM(VG_Real[% Avance Financiero de Obra]),
		LASTDATE(VG_Real[Fecha]
	)
)
```


For the SPI and CPI this are measures based on KPI's of earned value and are calculated as follows: 

![](/images/earned_value/Earned%20Value%20Formulas%20and%20Meanings.png)

This table with definitions and the calculations was found at this [link](https://planningengineer.net/project-management-general-definitions/ ). 

Here are the calculations done with DAX measurements: 

**Earned Value (EV)**

``` DAX

EV =
    CALCULATE(
        sum(VG_Real[Monto Contratado Obra]),
        LASTDATE(VG_Real[Fecha])
    )
    *CALCULATE(
        SUM(VG_Real[% Avance Físico de Obra]),
        LASTDATE(VG_Real[Fecha])
    )
```

**Planned Value (PV)**

``` DAX

PV =
    CALCULATE(
        sum(VG_Programado1[Monto Contratado Obra]),
        LASTDATE(VG_Programado1[Fecha])
    )
    *CALCULATE(
        SUM(VG_Programado1[% Avance Físico de Obra]),
        LASTDATE(VG_Programado1[Fecha])
    )
```


**Actual Cost (AC)**

``` DAX

AC = 
	CALCULATE(
		SUM(VG_Real[Monto Pagado / Ejecutado de Obra]),
		 LASTDATE(VG_Real[Fecha])
	)
```


**Cost Performance Index (CPI)**

``` DAX

CPI = [EV]/[AC]
```

For SPI the following conditional formatting was used: 

![](/images/earned_value/Earned_Value_Dashboard_Table_SPI_conditional_formatting.png)

**Schedule Performance Index (SPI)**

``` DAX

SPI = [EV]/[PV]
```

For CPI the following conditional formatting was used: 

![](/images/earned_value/Earned_Value_Dashboard_Table_CPI_Conditional_Formatting.png)
#### General Information

![](/images/earned_value/Earned_Value_Dashboard_General_Information.png)

It contains information from specific projects. Here we can see the following: 
- Start Date
- End Date
- Contracted Amount of the Project
- Contractor
- Supervisor

All have a measure as the information must show only when a specific project is selected. 

**Start Date**

```DAX
Fecha de Inicio =
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE(),
		CALCULATE(
			SUM(VG_Programado1[Fecha Inicio]),
			LASTDATE(VG_Programado1[Fecha])
		),
		"-"
	)
```

**End Date**

``` DAX
Fecha Fin =
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE(),
		CALCULATE(
			SUM(VG_Programado1[Fecha Fin]),
			LASTDATE(VG_Programado1[Fecha])
		),
	"-")
```

**Contracted Amount of the Project**

``` DAX
Monto Contratado =
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE(),
		CALCULATE(
			SUM(VG_Programado1[Monto Contratado Obra]),
			LASTDATE(VG_Programado1[Fecha])
		),
		"-"
	)
```


**Contractor**

``` DAX

Contratista = 
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE(),
		FIRSTNONBLANK(VG_Programado1[Empresa Ejecutora],1),
		"-"
	)
```

**Supervisor**

``` DAX

Supervisor =
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE(),
		FIRSTNONBLANK(VG_Programado1[Nombre de Supervisor],1),
		"-"
	)
```


#### Comments

![](/images/earned_value/Earned_Value_Dashboard_Comments.png)

It displays the last comment that have been registered from the project. This also depend on the project that have been selected.

This is the measure for the comments: 

```DAX

Comentario =
	IF(
		ISFILTERED(Proyectos[Proyecto])=TRUE(),
		FIRSTNONBLANK(VG_Programado1[Comentarios / Observaciones],1),
		"-"
	)
```

Take into consideration that in Contractor, Supervisor and Comments is looked up with the FIRSTNONBLANK as the table sorting changes from ascending to descending when a slicer was used.  