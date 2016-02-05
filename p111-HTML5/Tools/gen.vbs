Option Explicit

Const ForReading = 1, ForWriting = 2, ForAppending = 8
Const TristateUseDefault = -2, TristateTrue = -1, TristateFalse = 0

' Đọc chuỗi từ file
Function LoadStringFromFile(filename)
    Dim objStream
	Set objStream = CreateObject("ADODB.Stream")
	objStream.CharSet = "utf-8"
	objStream.Open
	objStream.LoadFromFile(fileName)
    LoadStringFromFile = objStream.ReadText()
    objStream.Close
End Function

' Lưu chuỗi vào file
Sub SaveStringToFile(filename, text)
    Dim fso, f
    Set fso = CreateObject("Scripting.FileSystemObject")
    Set f = fso.OpenTextFile(filename, ForWriting, True, TristateTrue)
    f.Write text & vbCrLf
    f.Close
End Sub

Function CheckExists(path, isPath)
    Dim fso
    Set fso = CreateObject("Scripting.FileSystemObject")
    If (isPath) Then
       CheckExists = fso.FolderExists(path)
       Exit Function
    Else
       CheckExists = fso.FileExists(path)
       Exit Function
    End If
End Function

Sub BackupFile(ByRef filePath, ByRef sBackupFolder)
    Dim objFSO
    Dim sSourceFolder
    Dim sFile, sFileExt
    Dim sDateTimeStamp
    Const OVER_WRITE_FILES = True

    Set objFSO = CreateObject("Scripting.FileSystemObject")
    sSourceFolder = objFSO.GetParentFolderName(filePath)
    sFile = objFSO.GetBaseName(filePath)
	sFileExt = objFSO.GetExtensionName(filePath)
	
    sDateTimeStamp = Pad(cStr(Day(now())),2) & _
                    "-" & Pad(cStr(Month(now())),2) & _
					"-" & cStr(Year(now())) & _
                    " " & Pad(cStr(Hour(now())),2) & _
                    "h " & Pad(cStr(Minute(now())),2) & _
                    "m " & Pad(cStr(Second(now())),2) & "s"

    'If the backup folder doesn't exist, create it.
    If Not objFSO.FolderExists(sBackupFolder) Then
        objFSO.CreateFolder(sBackupFolder)
    End If

    'Copy the file as long as the file can be found
    If objFSO.FileExists(sSourceFolder & "/" & sFile & "." & sFileExt) Then
        objFSO.CopyFile filePath,_
                        sBackupFolder & "/" & sFile & "_" & sDateTimeStamp & "." & sFileExt,_
                        OVER_WRITE_FILES
    End if
    Set objFSO = Nothing
End Sub

Function Pad(CStr2Pad, ReqStrLen)
    Dim Num2Pad

    Pad = CStr2Pad
    If len(CStr2Pad) < ReqStrLen Then
        Num2Pad = String((ReqStrlen - Len(CStr2Pad)), "0")
        Pad = Num2Pad & CStr2Pad
    End If
End Function

Function ParseConfig(ByRef config)
	Dim objStream, line, arr
	Set objStream = CreateObject("ADODB.Stream")
	objStream.Type = 2 'đọc từng kí tự
	objStream.LineSeparator = 10 '' # kí tự xuống dòng
	objStream.CharSet = "utf-8"
	objStream.Open
	objStream.LoadFromFile(config.Item("varFile"))
	Do Until objStream.EOS
	  line = objStream.ReadText(-2)
	  arr = Split(line, ":")
		If(arr(1) = "") Then
			WScript.echo "Chua config " + arr(0)
			objStream.Close()
			ParseConfig = False
			Exit Function
		Else
			'Sử dụng Replace(arr(1), Chr(13), "") để xóa ký tự xuống dòng
			Select Case arr(0)
				Case "ResourcePath"   	Call config.Add("ResourcePath", 	Replace(arr(1), Chr(13), ""))
				Case "GeneratePath"		Call config.Add("GeneratePath", 	Replace(arr(1), Chr(13), ""))
				Case "GenerateFile"   	Call config.Add("GenerateFile", 	Replace(arr(1), Chr(13), ""))
				Case "IsBackup"    		Call config.Add("IsBackup", 		Replace(arr(1), Chr(13), ""))
				Case "BackupPath"    	Call config.Add("BackupPath", 		Replace(arr(1), Chr(13), ""))
				Case "TemplateGeneral"	Call config.Add("TemplateGeneral", 	Replace(arr(1), Chr(13), ""))
				Case "TemplateGame"		Call config.Add("TemplateGame", 	Replace(arr(1), Chr(13), ""))
				Case "MapFileName"		Call config.Add("MapFileName", 		Replace(arr(1), Chr(13), ""))
				Case Else      			WScript.echo "Thiet lap cho lenh " & arr(0) & " khong ton tai"
			End Select
			ParseConfig = True
		End If
	Loop
	objStream.Close
	ParseConfig = True
	Exit Function
End Function

'VbScript không parse được json, phải chuyển qua javascript để parse
Function GetImageName(strJson)
	Dim sc
    Set sc = CreateObject("MSScriptControl.ScriptControl")
    sc.Language = "javascript"
    sc.AddCode "var json = " & strJson & ";"
	sc.AddCode "function getKeys(jsonObj) { var keys = new Array(); for (var i in jsonObj.frames) { keys.push(i.split('.')[0]); } return keys; } "
	sc.AddCode "var arr = getKeys(json);"
    GetImageName = sc.Eval("arr")
End Function

Function IsStringEndWithNumber(str)
	IsStringEndWithNumber = IsNumeric(Right(str, 1))
End Function

Function RemoveLastNumber(str)
	Dim lastIndex : lastIndex = Len(str) - 1
	Dim count : count = 1
	While lastIndex > 0
		If (IsNumeric(Right(str, count)) = False) Then
			RemoveLastNumber = Mid(str, 1, lastIndex + 1)
			Exit Function
		End If
		lastIndex = lastIndex - 1
		count = count + 1
	Wend
End Function

Function BuildArrayImage(PatternImage, ArrImage)
	Dim returnCode, posStart, posEnd, pattern, img
	posStart = InStr(PatternImage, "@ImgName")
	posEnd = InStr(PatternImage, "@EndImgName")
	pattern = Mid(PatternImage, posStart + 8, posEnd - posStart - 8)
	
	returnCode = Mid(PatternImage, 1, posStart - 1)
	returnCode = returnCode & "@Pattern" & Mid(PatternImage, posEnd + 11, Len(PatternImage) - posEnd + 11)
	
	Dim insertString, name, removedNumber, endWithNumber, index
	Dim resultString : resultString = ""
	Dim length : length = UBound(ArrImage)
	For index = 0 to length Step 1
		name = ArrImage(index)
		insertString = ""
		removedNumber = RemoveLastNumber(name)
		endWithNumber = IsStringEndWithNumber(name)
		If (endWithNumber And InStr(resultString, removedNumber) = 0) Then
			insertString = Replace(pattern, "@ImageName", removedNumber)
			insertString = Replace(insertString, "@Value", "[]")
		Else
			If(endWithNumber = False) Then
				insertString = Replace(pattern, "@ImageName", name)
				insertString = Replace(insertString, "@Value", "null")
			End If
		End If
		
		resultString = resultString & insertString
	Next
	
	resultString = RemoveLastComma(resultString)
	returnCode = Replace(returnCode, "@Pattern", resultString)
	BuildArrayImage = returnCode
End Function

Function RemoveLastComma(str)
	Dim lastIndex : lastIndex = Len(str) - 1
	While lastIndex > 0
		If (Mid(str, lastIndex, 1) = ",") Then
			RemoveLastComma = Mid(str, 1, lastIndex - 1)
			Exit Function
		End If
		lastIndex = lastIndex - 1
	Wend
End Function

Sub CreateGeneralSource(ResourcePath, GeneratePath, GenerateFile, template)
	Dim posStart, posEnd, newTemplate, pattern
	posStart = InStr(template, "@Pattern")
	posEnd = InStr(template, "@EndPattern")
	'WScript.echo Mid(template, posStart + 8, posEnd - posStart - 8)
	pattern = Mid(template, posStart + 8, posEnd - posStart - 8)
	newTemplate = Mid(template, 1, posStart - 1)
	newTemplate = newTemplate & "@Generate" & Mid(template, posEnd + 11, Len(template) - posEnd + 11)
	'WScript.echo newTemplate

	Dim objFSO, Path, Files, f, insertStr, name, json
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set Path = objFSO.GetFolder(ResourcePath)
	Set Files = Path.Files
	
	insertStr = ""
	Dim jsonObj, imageNames, imageName
	Dim count : count = 0
	For Each f in Files
		name = Split(f.name, ".")
		If(name(1) = "json") Then
			json = LoadStringFromFile(ResourcePath & "/" & f.name)
			jsonObj = GetImageName(json)
			imageNames = Split(CStr(jsonObj), ",")
			insertStr = insertStr & BuildArrayImage(Replace(pattern, "@SpriteSheetName", name(0)), imageNames)
		End If
	Next
	insertStr = RemoveLastComma(insertStr)
	newTemplate = Replace(newTemplate, "@Generate", insertStr)
	Call SaveStringToFile(GeneratePath & "/" & GenerateFile, newTemplate)
	WScript.echo GenerateFile & " da duoc tao den duong dan " & GeneratePath
End Sub

Function GetFixedGameName(name, arrNames)
	Dim index
	Dim length : length = UBound(arrNames)
	GetFixedGameName = UCase(name)
	For index = 0 To length Step 2
		If(arrNames(index) = name) Then
			GetFixedGameName = arrNames(index + 1)
			Exit Function
		End If
	Next
End Function

function InArr(str, arr)
	Dim s
	Dim result : result = False
	For Each s in arr
		result = result Xor (s = str)
	Next
	InArr = result
End Function

Sub CreateGameSource(ByRef config)
	Dim templateGame : templateGame = config.Item("TemplateGame")
	Dim ResourcePath : ResourcePath = config.Item("ResourcePath")
	Dim GeneratePath : GeneratePath = config.Item("GeneratePath")
	
	Dim template, posStart, posEnd, pattern
	Dim newTemplate : newTemplate = ""
	template = LoadStringFromFile(templateGame)
	
	Dim objFSO, Path, folder
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	Set Path = objFSO.GetFolder(ResourcePath)
	For Each folder in Path.SubFolders
		If(folder.name <> "images" And InArr(folder.name, config.Item("Games"))) Then
			Dim name 
			If(config.Exists("GameNamesArr")) Then
				name = GetFixedGameName(folder.name, config.Item("GameNamesArr"))
			Else
				name = UCase(folder.name)
			End If
			newTemplate = Replace(template, "@NameGame", name)
			Call CreateGeneralSource(ResourcePath & "/" & folder.name, GeneratePath, "Resource" & name & ".js", newTemplate)
		End If
	Next
	If(newTemplate = "") Then
		WScript.echo "Khong tim thay game ma ban chon"
	End If
End Sub

Function ParseArguments(ByRef config)
	Dim index
	For index = 0 To WScript.Arguments.Count - 1 Step 10
		Select Case WScript.Arguments.Item(index)
			Case "-game"
				If(index + 2 > WScript.Arguments.Count) Then
					WScript.echo "Thieu du lieu cho tuy chon -game"
					ParseArguments = False
				Else
					config.Item("options") = 2
					call config.Add("Games", Split(LCase(WScript.Arguments.Item(index + 1)), "|"))
					ParseArguments = True
				End If
				Exit Function
			Case "-all"	
				ParseArguments = True
				config.Item("options") = 3
			Case Else
				WScript.echo "Lua chon thiet lap " & WScript.Arguments.Item(index) & " khong ton tai"
		End Select
	Next
End Function

Sub Main()
    Dim isExists, returnValue, config
	Set config = CreateObject("Scripting.Dictionary")
	'option 1: Tạo chỉ general - không có thông số truyền vào
	'option 2: Tạo theo game - truyền vào -game game1|game2
	'option 3: Tạo tất cả - truyền vào -all
	Call config.Add("options", 1)
	Call config.Add("pathConfig", "ResourceGenerateConfig/")
	Call config.Add("varFile", config.Item("pathConfig") & "ConfigVars.txt")
	
	If (WScript.Arguments.Count <> 0 And ParseArguments(config) = False) then
		WScript.echo "Xuat hien loi khi doc thong so dong lenh"
        WScript.Quit
	End if

    isExists = CheckExists(config.Item("varFile"), False)
    If (isExists = False) Then
         WScript.echo "Khong tim thay file " & config.Item("varFile")
         WScript.Quit
    End If
	
	'parse tùy chỉnh
	WScript.echo "Dang doc file config: " & config.Item("varFile")
	returnValue = ParseConfig(config)
	If(returnValue = False) Then
		WScript.echo "Xuat hien loi trong qua trinh doc file " & config.Item("varFile")
        WScript.Quit
	End If
	
	'Xác định đường dẫn cho file template
	config.Item("TemplateGeneral") = config.Item("pathConfig") & config.Item("TemplateGeneral")
	config.Item("TemplateGame") = config.Item("pathConfig") & config.Item("TemplateGame")
	
	'Kiểm tra template chung
	isExists = CheckExists(config.Item("TemplateGeneral"), False)
    If (isExists = False) Then
         WScript.echo "Khong tim thay file " & config.Item("TemplateGeneral")
         WScript.Quit
    End If
	
	'Kiểm tra template game
	isExists = CheckExists(config.Item("TemplateGame"), False)
    If (isExists = False) Then
         WScript.echo "Khong tim thay file " & config.Item("TemplateGame")
         WScript.Quit
    End If
	
	'Map File Name -> nếu gặp những game tên được quy định sẵn thì sửa lại
	If(config.Item("MapFileName") <> "") Then
		Call config.Add("GameNamesArr", Split(config.Item("MapFileName"), "|"))
		If((UBound(config.Item("GameNamesArr")) + 1) Mod 2 <> 0) Then
			WScript.echo "Co loi xay ra voi tuy chon MapFileName"
			WScript.Quit
		End If
	End If
	
	'Sao lưu file template chung
	If(CInt(config.Item("IsBackup")) = 1) Then
		WScript.echo "Dang backup file: " & config.Item("GenerateFile")
		Call BackupFile(config.Item("GeneratePath") & "/" & config.Item("GenerateFile"), config.Item("BackupPath"))
	End If
	
	If(config.Item("options") = 1 Or config.Item("options") = 3) Then
		WScript.echo "Dang tao ma nguon general"
		Dim template : template = LoadStringFromFile(config.Item("TemplateGeneral"))
		Call CreateGeneralSource(config.Item("ResourcePath"), config.Item("GeneratePath"), config.Item("GenerateFile"), template)
	End If
	
	If(config.Item("options") = 2 Or config.Item("options") = 3) Then
		WScript.echo "Dang tao ma nguon game"
		Call CreateGameSource(config)
	End If
End Sub

Main()