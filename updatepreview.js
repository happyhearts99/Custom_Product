		function updatepreviewselection(textcontainer,textcounter,text,boundarycontainer,textsizecontainer,final){ 
			var minfont=parseInt($("#minfont").val());
			var change=true;
			var orgcopy=textcontainer.html();
			textcontainer.html("");
			var orgfontsizev=textsizecontainer.val();
			var fontsizev=orgfontsizev;
			var boundaryheight=boundarycontainer.height();
			var boundary=boundarycontainer.width();
			text=text.replace(/</g,"&lt;").replace(/>/g, "&gt;");
			var textcontainerid=textcontainer.attr("id");
			if(text.indexOf("\n") != -1)
			{
				var copysepa=text.split("\n");
				var arraycount=copysepa.length;
				var i;
				var loopbreak=false;	
				for(i=0;i<=arraycount;i++)
				{
					if(i!=arraycount)
					{
						if(i==0)
							textcontainer.append("<span class='copy' id='"+textcontainerid+"tx"+i+"' name='"+textcontainerid+"tx"+i+"'>"+copysepa[i]+"</span>");
						else
							textcontainer.append("<br/><span class='copy' id='"+textcontainerid+"tx"+i+"' name='"+textcontainerid+"tx"+i+"'>"+copysepa[i]+"</span>");
						if(textsizecontainer.length>0)
						{
							var textcounter = textcontainer.find("span.copy");
							textcounter.css("font-size",fontsizev+"pt");
							textcounter.css("line-height",fontsizev+"pt");
						}
						var lastline=textcontainer.find("span:last-child");	
						while(lastline.width()>boundary)
						{
							fontsizev=parseInt(fontsizev);
							fontsizev=fontsizev-1;
							if(fontsizev>=minfont)
							{
								textsizecontainer.val(fontsizev);
								textcounter.css("font-size",fontsizev+"pt");
								textcounter.css("line-height",fontsizev+"pt");
							}
							else 
							{				
								change=false;
								loopbreak=true;
								break;							
							}
						}
						if(loopbreak)
							break;
					}
					else
					{
						textcontainer.find("span:last-child").html(copysepa[i]);
						if(textsizecontainer.length>0)
						{
							var fontsizev=textsizecontainer.val();
							var textcounter = textcontainer.find("span.copy");
							textcounter.css("font-size",fontsizev+"pt");
							textcounter.css("line-height",fontsizev+"pt");											
						}						
					}
					var textcounterlastrow = textcontainer.find("span:last-child.copy");	
					while(textcontainer.height()>boundaryheight)
					{
						fontsizev=parseInt(fontsizev);
						fontsizev=fontsizev-1;
						if(fontsizev>=minfont)
						{
							textsizecontainer.val(fontsizev);
							textcounter.css("font-size",fontsizev+"pt");
							textcounter.css("line-height",fontsizev+"pt");
						}
						else
						{
							change=false;
							break;
						}
					}
				}
			}
			else
			{
				textcontainer.append("<span class='copy' id='"+textcontainerid+"tx0"+"' name='"+textcontainerid+"tx0"+"'>"+text+"</span>");
				var textcounterlastrow = textcontainer.find("span:last-child.copy");	
				if(textsizecontainer.length>0)
				{
					var textcounter = textcontainer.find("span.copy");
					textcounter.css("font-size",fontsizev+"pt");	
					textcounter.css("line-height",fontsizev+"pt");							
				}						
				var textwidth=textcounterlastrow.width();
				var i=1;
				while(textwidth>boundary)
				{
					var c;
					var lastrow=textcounterlastrow.html();
					var lastrowcurrent=lastrow;
					var numberofchars = lastrow.length; 
					for(c=0;c<numberofchars;c++)
					{
						if(lastrowcurrent.indexOf(" ") != -1)
						{
							if(lastrow.substr(numberofchars-c,1)==" ")
							{
								var reducetext=lastrow.substring(0,numberofchars-c);
								textcounterlastrow.html(reducetext);
								var newtextwidth=textcounterlastrow.width();
								if(newtextwidth<=boundary)
								{
									var lastrowtext=lastrow.substring(numberofchars-c+1);
									textcontainer.append("<br/><span class='copy' id='"+textcontainerid+"tx"+i+"' name='"+textcontainerid+"tx"+i+"'>"+lastrowtext+"</span>");
									i++;
									if(textsizecontainer.length>0)
									{
										var textcounter = textcontainer.find("span.copy");
										textcounter.css("font-size",fontsizev+"pt");	
										textcounter.css("line-height",fontsizev+"pt");							
									}			
									break;
								}
							}
						}
						else
						{
							var reducetext=lastrow.substring(0,numberofchars-c);
							textcounterlastrow.html(reducetext);
							var newtextwidth=textcounterlastrow.width();
							if(newtextwidth<=boundary)
							{
								var lastrowtext=lastrow.substring(numberofchars-c);
								textcontainer.append("<br/><span class='copy' id='"+textcontainerid+"tx"+i+"' name='"+textcontainerid+"tx"+i+"'>"+lastrowtext+"</span>");
								i++;
								if(textsizecontainer.length>0)
								{
									var textcounter = textcontainer.find("span.copy");
									textcounter.css("font-size",fontsizev+"pt");	
									textcounter.css("line-height",fontsizev+"pt");							
								}			
								break;
							}					
						}
						lastrowcurrent=textcontainer.find("span:last-child.copy").html();
					}
					textcounterlastrow = textcontainer.find("span:last-child.copy");
					textwidth=textcounterlastrow.width();	
				}
				if(textcontainer.height()>boundaryheight)
				{
					fontsizev=parseInt(fontsizev);
					fontsizev=fontsizev-1;
					if(fontsizev>=minfont)
					{
						textsizecontainer.val(fontsizev);
						final=false;							
					}
					else
					{
						change=false;
					}										
				}	
			}		
			if(final)
				return change;
			else
				return updatepreviewselection(textcontainer,textcounter,text,boundarycontainer,textsizecontainer,true);
		};  	  		 	  		
